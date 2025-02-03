"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const signInAction = createServerAction(
  async (user: { email: string; password: string }) => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    if (error) throw new ServerActionError(error.message);

    return {
      redirectTo: routes.protected.dashboard,
    };
  },
);

export default signInAction;