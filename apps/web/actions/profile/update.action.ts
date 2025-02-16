import ProfileModel, { Profile } from "@workspace/database/models/Profile";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

export const updateProfile = createServerAction(
  async (payload: Partial<Profile>) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      return new ProfileModel(supabase).update(user.data.user.id, payload);
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);
