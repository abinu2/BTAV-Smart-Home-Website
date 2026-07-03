/**
 * lib/security.ts — Server-only security helpers for API routes.
 *
 * - hashIp: one-way SHA-256 of (IP + site salt). We never store raw IPs
 *   (AGENTS.md §6.2 / §7C). The salt is CSRF_SECRET so hashes are not
 *   reversible via a rainbow table of bare IPs.
 * - sanitize: strip ALL HTML from a string before it touches the database.
 * - getClientIp / getUserAgentType: parse request headers.
 */
import 'server-only';
import { createHash } from 'crypto';
import sanitizeHtml from 'sanitize-html';
import { env } from '@/lib/env';

export function hashIp(ip: string): string {
  return createHash('sha256').update(`${ip}:${env.CSRF_SECRET}`).digest('hex');
}

/** Remove every tag and attribute — these fields are plain text only. */
export function sanitize(input: string): string {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
}

/** First IP in x-forwarded-for, falling back to a stable sentinel. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return headers.get('x-real-ip')?.trim() || 'unknown';
}

export function getUserAgentType(headers: Headers): 'mobile' | 'tablet' | 'desktop' {
  const ua = (headers.get('user-agent') || '').toLowerCase();
  if (/ipad|tablet/.test(ua)) return 'tablet';
  if (/mobi|android|iphone/.test(ua)) return 'mobile';
  return 'desktop';
}
