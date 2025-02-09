import client, { ClientConnection } from "@workspace/database/browser";

export const createClient = (): ClientConnection => {
  return client({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });
}
