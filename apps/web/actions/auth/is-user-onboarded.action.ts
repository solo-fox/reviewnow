"use server";

import { hasUserOrganizations } from "@workspace/database/models/organizations";
import { createServerAction, ServerActionError } from "@/lib/action-utils";
import { routes } from "@/lib/routes";
import { createClient } from "@/lib/server";

export const isUserOnboardedAction = createServerAction(async () => {
  const supabase = await createClient(),
    user = await supabase.auth.getUser();

  if (user.error) {
    throw new ServerActionError(user.error.message);
  }

  const orgData = await hasUserOrganizations(supabase, {
    userId: user.data.user.id,
  });

  if (orgData === null || orgData.length === 0 || orgData === undefined) {
    return {
      onboarded: false,
      orgId: null,
    };
  }

  return {
    onboarded: true,
    orgId: orgData[0]?.id,
  };
});
