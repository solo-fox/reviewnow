import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export default function Client({
  url,
  anonKey,
}: {
  url: string;
  anonKey: string;
}) {
  let client = createClient<Database>(url, anonKey);

  return client;
}
