/**
 * lib/supabase.ts — Server-only Supabase admin client.
 *
 * Uses SUPABASE_SERVICE_ROLE_KEY, which bypasses Row Level Security. This file
 * must NEVER be imported into a client component. The `server-only` import
 * makes a client-side import a build error (AGENTS.md §6.2).
 */
import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

let cached: SupabaseClient | null = null;

/** Lazily create (and memoize) the service-role client. */
export function getServiceClient(): SupabaseClient {
  if (cached) return cached;
  cached = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
  return cached;
}
