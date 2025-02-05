"use server";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import { createClient } from "@/lib/server";
import routes from "@/lib/routes";
import Project from "@workspace/database/models/Project";

const newProjectAction = createServerAction(async (payload: {
  projectName: string,
  projectDescription: string
}) => {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (user.error) throw new ServerActionError(user.error.message);

  try {
    const projectId = await new Project(supabase).create(user.data.user.id, {
      name: payload.projectName,
      description: payload.projectDescription,
    });

    return {
      redirectTo: routes.protected.project(projectId)
    }
  } catch(error: any) {
    throw new ServerActionError(error.message)
  }
});

export default newProjectAction;
