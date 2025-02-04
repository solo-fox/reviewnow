"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const onboardAction = createServerAction(
  async (payload: {
    orgName: string,
    projectName: string,
  }) => {
    throw new ServerActionError("Not implemented")
    const supabase = await createClient();

    return {
      redirectTo: routes.auth.signin,
    };
  },
);

export default onboardAction