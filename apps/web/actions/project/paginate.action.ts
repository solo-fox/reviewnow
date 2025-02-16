"use server";

import ProjectModel from "@workspace/database/models/Project";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

export const paginateProjects = createServerAction(
  async (payload: { limit: number; offset: number; search: string | null }) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      const projects = await new ProjectModel(supabase).paginate(
        user.data.user.id,
        payload,
      );

      return {
        projects,
        nextOffset:
          projects.length < payload.limit
            ? null
            : payload.offset + payload.limit, // Check if more data exists
      };
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);
