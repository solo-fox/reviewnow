import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export default function client({
  url,
  anonKey,
}: {
  url: string;
  anonKey: string;
}) {
  let client = createClient<Database>(url, anonKey);

  return client;
}
