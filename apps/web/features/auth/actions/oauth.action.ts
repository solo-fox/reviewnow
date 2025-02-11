"use server";

import { createServerAction, ServerActionError } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const oauthAction = createServerAction(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: routes.api.auth.callback,
    },
  });

  if (error) throw new ServerActionError(error.message);

  return {
    redirectTo: data.url,
  };
});

export default oauthAction;
