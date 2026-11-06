import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

let client: SupabaseClient | null = null;

/**
 * Cookieless anonymous client for reading PUBLIC content inside `'use cache'`
 * scopes. Row Level Security limits it to published records. Never use it for
 * user-specific data — use the request-scoped client from ./server instead.
 */
export function getPublicClient() {
  if (!client) {
    client = createClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
