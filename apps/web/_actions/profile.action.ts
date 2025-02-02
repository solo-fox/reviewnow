"use server";

import ServerActionReturn from "@/_types/server-actions";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";
import Profile, { ProfileShow } from "@workspace/database/models/Profile";

export default async function profileAction(): Promise<
  ServerActionReturn<ProfileShow | undefined>
> {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (user.error || !user.data.user.id) {
    return {
      success: false,
      error: undefined,
      data: undefined,
      redirect: true,
      url: routes.auth.signin,
    };
  }

  try {
    const userProfile = await new Profile(supabase).show(user.data.user.id);
    return {
      success: true,
      error: undefined,
      data: userProfile,
      redirect: false,
      url: undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      data: undefined,
      redirect: false,
      url: routes.error,
    };
  }
}
