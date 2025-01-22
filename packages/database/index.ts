import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export default function Client({
  url,
  anon_key,
}: {
  url: string;
  anon_key: string;
}) {
  let client = createClient<Database>(url, anon_key);

  return client;
}
