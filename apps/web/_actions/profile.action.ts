"use server";

import { createClient } from "@/lib/server";
import { Database } from "../../../packages/database/database.types";

type Profile = Database['public']['Tables']['profiles']['Row'];

export default async function profileAction(): Promise<Profile> {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error) encodedRedirect("/auth/signin");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.data.user?.id)
    .limit(1)
    .single();

  if (error) notFound()
  if(!data) notFound()

  return data;
}
