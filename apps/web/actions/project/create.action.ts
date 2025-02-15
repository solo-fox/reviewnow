"use server";

import ProjectModel from "@workspace/database/models/Project";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";

const createProjectAction = createServerAction(
  async (payload: { projectName: string; projectDescription: string }) => {
    const supabase = await createClient(),
      user = await supabase.auth.getUser();

    if (user.error) {
      throw new ServerActionError(user.error.message);
    }

    try {
      const project = await new ProjectModel(supabase).create(
        user.data.user.id,
        {
          name: payload.projectName,
          description: payload.projectDescription,
        },
      );

      return project;
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError((error as Error).message);
    }
  },
);

export default createProjectAction;
