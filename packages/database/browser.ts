import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export type ClientConnection = SupabaseClient<Database>;
export default function client({
  url,
  anonKey,
}: {
  url: string;
  anonKey: string;
}) {
  let client = createBrowserClient<Database>(url, anonKey);

  return client;
}
