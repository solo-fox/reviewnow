"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";
import Profile from "@workspace/database/models/Profile";

const profileAction = createServerAction(async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (user.error) throw new ServerActionError(user.error.message);

  try {
    return new Profile(supabase).view(user.data.user.id);
  } catch (error: any) {
    throw new ServerActionError(error.message);
  }
});

export default profileAction;
