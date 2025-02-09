"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const signOutAction = createServerAction(async () => {
  const supabase = await createClient(),

   { error } = await supabase.auth.signOut();

  if (error) {throw new ServerActionError(error.message);}

  return {
    redirectTo: routes.auth.signin,
  };
});

export default signOutAction;
