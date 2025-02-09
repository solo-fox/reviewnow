"use server";

import Profile from "@workspace/database/models/Profile";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

const viewProfileAction = createServerAction(async () => {
  const supabase = await createClient(),
    user = await supabase.auth.getUser();

  if (user.error) {
    throw new ServerActionError(user.error.message);
  }

  try {
    return new Profile(supabase).view(user.data.user.id);
  } catch (error: any) {
    throw new ServerActionError(error.message);
  }
});

export default viewProfileAction;
