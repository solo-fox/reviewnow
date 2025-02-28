import { createOrganization } from "@workspace/database/models/organizations";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";
import { TablesInsert } from "@workspace/database/types";

export const createOrganizationAction = createServerAction(
  async (payload: Partial<TablesInsert<"organizations">>) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      return await createOrganization(supabase, {
        userId: user.data.user.id,
        fields: payload,
      });
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);
