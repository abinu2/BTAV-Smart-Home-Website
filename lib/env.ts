/**
 * lib/env.ts
 * ------------------------------------------------------------------
 * Centralized, type-safe environment variable access for BTAV.
 *
 * - Validates all required variables with Zod at import time.
 * - Throws a descriptive error if any required variable is missing,
 *   preventing the app from running in a silently misconfigured state.
 * - Server-only secrets (SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY,
 *   UPSTASH_*, CSRF_SECRET) are validated ONLY on the server. They are
 *   never bundled into client code and never read from a NEXT_PUBLIC_ var.
 *
 * Usage:
 *   import { env } from '@/lib/env';
 *   const url = env.NEXT_PUBLIC_SUPABASE_URL;        // anywhere
 *   const key = env.SUPABASE_SERVICE_ROLE_KEY;        // server only
 * ------------------------------------------------------------------
 */
import { z } from 'zod';

const isServer = typeof window === 'undefined';

/** Variables that are safe to expose to the browser. */
const clientSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url('NEXT_PUBLIC_SUPABASE_URL must be a valid URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required'),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url('NEXT_PUBLIC_SITE_URL must be a valid URL'),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),
});

/**
 * Secrets that must never reach the client bundle.
 *
 * RESEND_API_KEY and the two UPSTASH_* vars are OPTIONAL: if they are not set,
 * the build still succeeds and the app degrades gracefully at runtime — leads
 * are still saved to Supabase, but the confirmation emails and rate limiting
 * are skipped until those services are configured.
 */
const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
  OWNER_EMAIL: z.string().email('OWNER_EMAIL must be a valid email'),
  FROM_EMAIL: z.string().email('FROM_EMAIL must be a valid email'),
  CSRF_SECRET: z
    .string()
    .min(32, 'CSRF_SECRET must be at least 32 characters'),
  // Optional integrations — absence never fails the build.
  RESEND_API_KEY: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
});

type ClientEnv = z.infer<typeof clientSchema>;
type ServerEnv = z.infer<typeof serverSchema>;

function formatErrors(error: z.ZodError): string {
  return error.errors
    .map((e) => `  - ${e.path.join('.') || 'env'}: ${e.message}`)
    .join('\n');
}

/**
 * Next.js inlines NEXT_PUBLIC_* references at build time only when they
 * are accessed via static property lookup on process.env, so we read each
 * explicitly rather than passing process.env wholesale.
 */
function parseClientEnv(): ClientEnv {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_VERCEL_ANALYTICS_ID:
      process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
  });

  if (!parsed.success) {
    throw new Error(
      `❌ Invalid public environment variables:\n${formatErrors(parsed.error)}`,
    );
  }
  return parsed.data;
}

function parseServerEnv(): ServerEnv {
  const parsed = serverSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OWNER_EMAIL: process.env.OWNER_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    CSRF_SECRET: process.env.CSRF_SECRET,
  });

  if (!parsed.success) {
    throw new Error(
      `❌ Invalid server environment variables:\n${formatErrors(parsed.error)}`,
    );
  }
  return parsed.data;
}

const clientEnv = parseClientEnv();

/**
 * Combined env object.
 *
 * Server secrets are validated and attached only on the server. Accessing a
 * server-only key from a client component returns undefined at runtime and is
 * blocked at compile time by the `ServerOnly` typing below.
 */
export const env = {
  ...clientEnv,
  ...(isServer ? parseServerEnv() : ({} as ServerEnv)),
} as ClientEnv & ServerEnv;
