"use server";

import Profile from "@workspace/database/models/Profile";
import Project from "@workspace/database/models/Project";

import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";
import { createClient } from "@/lib/server";

const onboardAction = createServerAction(
  async (payload: { orgName: string; projectName: string }) => {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (user.error) throw new ServerActionError(user.error.message);

    try {
      await new Profile(supabase).update(user.data.user.id, {
        org_name: payload.orgName,
      });
      const projectId = await new Project(supabase).create(user.data.user.id, {
        name: payload.projectName,
        description: "This is my lovely project, becuase I love my users.",
      });

      return {
        redirectTo: routes.protected.project(projectId),
      };
      // eslint-disable-next-line
    } catch (error: any) {
      throw new ServerActionError(error.message);
    }
  },
);

export default onboardAction;
