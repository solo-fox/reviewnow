"use server";

import Project from "@workspace/database/models/Project";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const newProjectAction = createServerAction(
  async (payload: { projectName: string; projectDescription: string }) => {
    const supabase = await createClient(),
     user = await supabase.auth.getUser();

    if (user.error) {throw new ServerActionError(user.error.message);}

    try {
      const projectId = await new Project(supabase).create(user.data.user.id, {
        name: payload.projectName,
        description: payload.projectDescription,
      });

      return {
        redirectTo: routes.protected.project(projectId),
      };
    } catch (error: any) {
      throw new ServerActionError(error.message);
    }
  },
);

export default newProjectAction;
