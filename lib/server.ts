import Client from "database/server";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return Client({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getAll() {
      return cookieStore.getAll();
    },
    setAll(cookiesToSet) {
      try {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      } catch (error) {
        // The `set` method was called from a Server Component.
        // This can be ignored if you have middleware refreshing
        // user sessions.
      }
    },
  });
};
