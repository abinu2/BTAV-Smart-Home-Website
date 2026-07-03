/**
 * lib/ratelimit.ts — Server-only rate limiting for the contact API.
 *
 * Two sliding windows per identifier (hashed IP): 3/hour and 10/day. Returns a
 * combined decision plus the seconds until the most restrictive window resets.
 */
import 'server-only';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from '@/lib/env';

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const hourly = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  prefix: 'btav:contact:hr',
  analytics: false,
});

const daily = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 d'),
  prefix: 'btav:contact:day',
  analytics: false,
});

export interface RateLimitResult {
  success: boolean;
  retryAfter: number; // seconds
}

/** Check both windows. Fails closed-but-graceful: if Redis errors, allow. */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
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
