"use server";

import { paginateProjects } from "@workspace/database/models/projects";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

export const paginateProjectsAction = createServerAction(
  async (payload: {
    orgId: string;
    options: { limit: number; offset: number; search: string | null };
  }) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      const projectsSet = await paginateProjects(supabase, {
        userId: user.data.user.id,
        orgId: payload.orgId,
        options: payload.options,
      });

      return {
        projects: projectsSet,
        nextOffset:
          projectsSet.length < payload.options.limit
            ? null
            : payload.options.offset + payload.options.limit,
      };
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);
