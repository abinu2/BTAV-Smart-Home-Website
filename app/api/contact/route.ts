/**
 * POST /api/contact — quote-form submissions.
 *
 * Pipeline: origin/method guard → size guard → honeypot → Zod validation →
 * rate limit (hashed IP) → sanitize → save to Supabase → owner + customer
 * emails. Resilient: a Supabase or email failure still returns 200 if the lead
 * was otherwise captured, and internal errors never leak to the client.
 * Never logs PII (AGENTS.md §6.2 / §15).
 */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/contact';
import { env } from '@/lib/env';
import { getServiceClient } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/ratelimit';
import {
  hashIp,
  sanitize,
  getClientIp,
  getUserAgentType,
} from '@/lib/security';
import {
  ownerEmailHtml,
  customerEmailHtml,
} from '@/lib/emails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 16 * 1024; // 16KB — no file uploads.

function allowedOrigins(): string[] {
  return [env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000'];
}

function reqId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** Reject cross-origin POSTs. Same-origin fetches may omit Origin → allow. */
function originOk(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  return allowedOrigins().includes(origin);
}

export async function POST(req: Request) {
  const id = reqId();
  const ts = new Date().toISOString();

  if (!originOk(req)) {
    console.warn(`[contact ${id}] ${ts} rejected: bad origin`);
    return NextResponse.json(
      { success: false, message: 'Forbidden' },
      { status: 403 },
    );
  }

  // Body size guard.
  const raw = await req.text();
  if (raw.length > MAX_BYTES) {
    return NextResponse.json(
      { success: false, message: 'Request too large' },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 },
    );
  }

  // Honeypot — silently accept (200) so bots get no signal, but do nothing.
  if (
    body &&
    typeof body === 'object' &&
    'honeypot' in body &&
    typeof (body as Record<string, unknown>).honeypot === 'string' &&
    ((body as Record<string, unknown>).honeypot as string).length > 0
  ) {
    console.info(`[contact ${id}] ${ts} result=spam (honeypot)`);
    return NextResponse.json({ success: true, message: 'Request received' });
  }

  // Validate.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!errors[key]) errors[key] = issue.message;
    }
    console.info(`[contact ${id}] ${ts} result=invalid fields=${Object.keys(errors).join(',')}`);
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const data = parsed.data;

  // Rate limit by hashed IP.
  const ip = getClientIp(req.headers);
  const ipHash = hashIp(ip);
  try {
    const rl = await checkRateLimit(ipHash);
    if (!rl.success) {
      console.info(`[contact ${id}] ${ts} result=ratelimited`);
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later, or email us.',
          retryAfter: rl.retryAfter,
        },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } },
      );
    }
  } catch (e) {
    // Fail-open on limiter errors so a Redis hiccup never blocks a real lead.
    console.error(`[contact ${id}] ${ts} ratelimit error`, e);
  }

  // Sanitize all free-text fields.
  const clean = {
    name: sanitize(data.name),
    email: sanitize(data.email).toLowerCase(),
    city: sanitize(data.city),
    zip: data.zip ? sanitize(data.zip) : null,
    service: data.service,
    tier: data.tier,
    description: data.description ? sanitize(data.description) : null,
    budget_range: data.budget_range || null,
    timeline: data.timeline || null,
    source: data.source ? sanitize(data.source) : null,
  };

  // Save to Supabase (graceful).
  let saved = false;
  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from('leads').insert({
      ...clean,
      ip_hash: ipHash,
      user_agent_type: getUserAgentType(req.headers),
      page_referrer: req.headers.get('referer') || null,
    });
    if (error) throw error;
    saved = true;
  } catch (e) {
    console.error(`[contact ${id}] ${ts} supabase insert failed`, e);
  }

  // Send emails (graceful — lead already captured if saved). Skipped entirely
  // when Resend isn't configured yet, so leads still save without it.
  const resendKey = env.RESEND_API_KEY;
  if (resendKey && !resendKey.includes('placeholder')) {
    try {
      const resend = new Resend(resendKey);
      await Promise.allSettled([
        resend.emails.send({
          from: env.FROM_EMAIL,
          to: env.OWNER_EMAIL,
          replyTo: clean.email,
          subject: `New Quote Request — ${clean.service} — ${clean.name}`,
          html: ownerEmailHtml(clean, ts),
        }),
        resend.emails.send({
          from: `BTAV Smart Home <${env.FROM_EMAIL}>`,
          to: clean.email,
          subject: 'We received your request — BTAV Smart Home',
          html: customerEmailHtml(clean),
        }),
      ]);
    } catch (e) {
      console.error(`[contact ${id}] ${ts} email send failed`, e);
    }
  } else {
    console.info(`[contact ${id}] ${ts} email skipped (Resend not configured)`);
  }

  console.info(`[contact ${id}] ${ts} result=success saved=${saved}`);
  return NextResponse.json({ success: true, message: 'Request received' });
}

/** Anything other than POST → 405. */
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405, headers: { Allow: 'POST' } },
  );
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get('origin');
  const ok = !origin || allowedOrigins().includes(origin);
  return new NextResponse(null, {
    status: ok ? 204 : 403,
    headers: ok
      ? {
          'Access-Control-Allow-Origin': origin ?? env.NEXT_PUBLIC_SITE_URL,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      : {},
  });
}
