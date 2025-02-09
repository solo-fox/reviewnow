"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const signUpAction = createServerAction(
  async (payload: { email: string; password: string }) => {
    const supabase = await createClient(),

     { error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (error) {throw new ServerActionError(error.message);}

    return {
      redirectTo: routes.protected.dashboard,
    };
  },
);

export default signUpAction;
