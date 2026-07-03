/**
 * lib/emails.ts — Dark-theme branded HTML email templates (Resend).
 *
 * Values are already sanitized before reaching these functions. Inline styles
 * are required for email-client compatibility (no external CSS).
 */

export interface LeadEmailData {
  name: string;
  email: string;
  city: string;
  zip: string | null;
  service: string;
  tier: string;
  description: string | null;
  budget_range: string | null;
  timeline: string | null;
  source: string | null;
}

const BG = '#0A0C10';
const SURFACE = '#0F1620';
const ACCENT = '#5FBEB2';
const TEXT = '#F2F1EC';
const MUTED = '#7A8BA8';

function row(label: string, value: string | null): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:8px 0;color:${MUTED};font-size:13px;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;color:${TEXT};font-size:14px;">${value}</td>
    </tr>`;
}

function shell(inner: string): string {
  return `
  <div style="background:${BG};padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:${SURFACE};border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <span style="font-size:22px;font-weight:700;color:${TEXT};letter-spacing:-0.5px;">BT<span style="color:${ACCENT};">AV</span></span>
        <span style="display:block;font-size:9px;letter-spacing:3px;color:${MUTED};margin-top:4px;">SMART HOME</span>
      </div>
      <div style="padding:28px;">${inner}</div>
    </div>
  </div>`;
}

/** Owner notification — full submission detail. */
export function ownerEmailHtml(data: LeadEmailData, timestamp: string): string {
  const inner = `
    <h1 style="margin:0 0 4px;color:${TEXT};font-size:20px;">New Quote Request</h1>
    <p style="margin:0 0 20px;color:${MUTED};font-size:13px;">${timestamp}</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row('Name', data.name)}
      ${row('Email', `<a href="mailto:${data.email}" style="color:${ACCENT};text-decoration:none;">${data.email}</a>`)}
      ${row('City', `${data.city}${data.zip ? ' ' + data.zip : ''}`)}
      ${row('Service', data.service)}
      ${row('Tier', data.tier)}
      ${row('Budget', data.budget_range)}
      ${row('Timeline', data.timeline)}
      ${row('Heard via', data.source)}
      ${row('Details', data.description)}
    </table>
    <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);color:${MUTED};font-size:12px;">
      Reply directly to this email to respond to ${data.name}.
    </p>`;
  return shell(inner);
}

/** Customer confirmation — reassurance + next steps. */
export function customerEmailHtml(data: LeadEmailData): string {
  const inner = `
    <h1 style="margin:0 0 12px;color:${TEXT};font-size:22px;">Thanks, ${data.name} — we've got your request.</h1>
    <p style="margin:0 0 16px;color:${MUTED};font-size:15px;line-height:1.6;">
      A BTAV specialist will review your project and reach out within
      <strong style="color:${TEXT};">two business hours</strong>. Here's what happens next:
    </p>
    <ol style="margin:0 0 20px;padding-left:20px;color:${MUTED};font-size:14px;line-height:1.8;">
      <li>We'll email to learn more about your space and goals.</li>
      <li>We'll recommend an approach and, if it's a fit, schedule a consultation.</li>
      <li>You'll get a clear, transparent proposal — no pressure.</li>
    </ol>
    <p style="margin:0 0 24px;color:${MUTED};font-size:14px;line-height:1.6;">
      Need us sooner? Email <a href="mailto:btavservices4@gmail.com" style="color:${ACCENT};text-decoration:none;">btavservices4@gmail.com</a>.
    </p>
    <div style="padding:16px;background:rgba(95,190,178,0.08);border:1px solid rgba(95,190,178,0.2);border-radius:12px;">
      <p style="margin:0;color:${TEXT};font-size:13px;">
        BTAV is a Control4 Specialist serving all of Maricopa County, Arizona.
      </p>
    </div>`;
  return shell(inner);
}
