"use server";

import ProfileModel from "@workspace/database/models/Profile";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

const findProfileAction = createServerAction(async () => {
  const supabase = await createClient(),
    user = await supabase.auth.getUser();

  if (user.error) {
    throw new ServerActionError(user.error.message);
  }

  try {
    return new ProfileModel(supabase).findById(user.data.user.id);
    // eslint-disable-next-line
  } catch (error: any) {
    throw new ServerActionError((error as Error).message);
  }
});

export default findProfileAction;
