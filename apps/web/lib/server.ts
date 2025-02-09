import client, { ClientConnection } from "@workspace/database/server";
import logger from "@workspace/logger";
import { cookies } from "next/headers";

import { env } from "@/env";

export const createClient = async (): Promise<ClientConnection> => {
  const cookieStore = await cookies();

  return client({
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    getAll: () => cookieStore.getAll(),
    setAll: (cookiesToSet) => {
      try {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      } catch (error) {
        // Ensure 'error' is correctly typed
        if (error instanceof Error) {
          logger.error(error.message);
        } else {
          logger.error("An unknown error occurred");
        }
      }
    },
  });
};
