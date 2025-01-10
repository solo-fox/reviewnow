import Client from "database/browser";

export const createClient = Client({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});
