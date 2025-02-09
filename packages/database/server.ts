import { CookieOptions, createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

type CookieToSet = {
  name: string;
  value: string;
  options: CookieOptions;
}[];
export type ClientConnection = SupabaseClient<Database>;

export default function client({
  url,
  anonKey,
  getAll,
  setAll,
}: {
  url: string;
  anonKey: string;
  // eslint-disable-next-line
  getAll: () => any;
  setAll: (cookiesToSet: CookieToSet) => void;
}) {
  const client = createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll,
      setAll,
    },
  });
  return client;
}
