"use server";

import { projects } from "@workspace/database/models/projects";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

export const createProject = createServerAction(
  async (payload: {
    orgId: string;
    projectName: string;
    projectDescription: string;
  }) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      return await projects.create(supabase, {
        userId: user.data.user.id,
        orgId: payload.orgId,
        fields: {
          name: payload.projectName,
          description: payload.projectDescription,
        },
      });

      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);
