"use server";

import { createClient } from "@/lib/server";
import { encodedRedirect } from "@/lib/utils";
import Profile, { ProfileShow } from "@workspace/database/models/Profile";

export default async function profileAction(): Promise<ProfileShow> {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error || !user.data.user.id) return encodedRedirect("/auth/signin");
  return await new Profile(supabase).show(user.data.user.id);
}
