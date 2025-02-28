import { updateOrganization } from "@workspace/database/models/organizations";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";
import { TablesUpdate } from "@workspace/database/types";

export const updateOrganizationAction = createServerAction(
  async (
    payload: Omit<TablesUpdate<"organizations">, "id"> & { id: string },
  ) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      return await updateOrganization(supabase, {
        userId: user.data.user.id,
        orgId: payload.id,
        fields: payload,
      });
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);
