"use server";

import { getAllOrganizations } from "@workspace/database/models/organizations";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

 export const getAllOrganizationsAction = createServerAction(async () => {
  const supabase = await createClient(),
    user = await supabase.auth.getUser();

  if (user.error) {
    throw new ServerActionError(user.error.message);
  }

  try {
    return await getAllOrganizations(supabase, {
      userId: user.data.user.id,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    throw new ServerActionError((error as Error).message);
  }
})