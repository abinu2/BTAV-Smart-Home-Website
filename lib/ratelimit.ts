/**
 * lib/ratelimit.ts — Server-only rate limiting for the contact API.
 *
 * Two sliding windows per identifier (hashed IP): 3/hour and 10/day. Returns a
 * combined decision plus the seconds until the most restrictive window resets.
 *
 * Upstash is optional: if the credentials are absent or still placeholders,
 * rate limiting is skipped (every request is allowed) rather than crashing.
 */
import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from '@/lib/env';

export interface RateLimitResult {
  success: boolean;
  retryAfter: number; // seconds
}

const url = env.UPSTASH_REDIS_REST_URL;
const token = env.UPSTASH_REDIS_REST_TOKEN;
const configured = Boolean(
  url && token && !url.includes('placeholder') && !token.includes('placeholder'),
);

const hourly = configured
  ? new Ratelimit({
      redis: new Redis({ url: url!, token: token! }),
      limiter: Ratelimit.slidingWindow(3, '1 h'),
      prefix: 'btav:contact:hr',
      analytics: false,
    })
  : null;

const daily = configured
  ? new Ratelimit({
      redis: new Redis({ url: url!, token: token! }),
      limiter: Ratelimit.slidingWindow(10, '1 d'),
      prefix: 'btav:contact:day',
      analytics: false,
    })
  : null;

/** Check both windows. Skips (allows) when Upstash isn't configured. */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  if (!hourly || !daily) return { success: true, retryAfter: 0 };

  const [h, d] = await Promise.all([
    hourly.limit(identifier),
    daily.limit(identifier),
  ]);

  const success = h.success && d.success;
  // reset is an epoch-ms timestamp; convert the failing one to seconds-from-now.
  const now = Date.now();
  const resets: number[] = [];
  if (!h.success) resets.push(h.reset);
  if (!d.success) resets.push(d.reset);
  const retryAfter = resets.length
    ? Math.max(1, Math.ceil((Math.max(...resets) - now) / 1000))
    : 0;

  return { success, retryAfter };
}
