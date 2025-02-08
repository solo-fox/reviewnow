import Client, { ClientConnection } from "@workspace/database/browser";

export function createClient(): ClientConnection {
  return Client({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });
}
