import { createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

export default function client({
  url,
  anonKey,
}: {
  url: string;
  anonKey: string;
}) {
  const client = createClient<Database>(url, anonKey);

  return client;
}
