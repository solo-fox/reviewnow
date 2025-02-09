import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

export type ClientConnection = SupabaseClient<Database>;
export default function client({
  url,
  anonKey,
}: {
  url: string;
  anonKey: string;
}) {
  const client = createBrowserClient<Database>(url, anonKey);

  return client;
}
