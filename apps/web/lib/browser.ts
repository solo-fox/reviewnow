import client, { ClientConnection } from "@workspace/database/browser";

import { env } from "@/env";

export function createClient(): ClientConnection {
  return client({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}
