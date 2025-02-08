import { createServerClient, CookieOptions } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
}[];
export type ClientConnection = SupabaseClient<Database>;

export default function Client({
  url,
  anonKey,
  getAll,
  setAll,
}: {
  url: string;
  anonKey: string;
  getAll: () => any;
  setAll: (cookiesToSet: CookieToSet) => void;
}) {
  let client = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll,
      setAll,
    },
  });
  return client;
}
