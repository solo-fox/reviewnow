"use server";

import Project from "@workspace/database/models/Project";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

const listProjectsAction = createServerAction(
  async (payload: { limit: number; offset: number; search?: string }) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      const projects = await new Project(supabase).list(user.data.user.id, payload);
      // eslint-disable-next-line
      return {
        projects,
        nextOffset: projects.length < payload.limit ? null : payload.offset + payload.limit, // Check if more data exists
      };
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);

export default listProjectsAction;
