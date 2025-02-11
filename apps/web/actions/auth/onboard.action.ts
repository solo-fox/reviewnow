"use server";

import updateProfileAction from "@/actions/profile/update.action";
import createProjectAction from "@/actions/project/create.action";
import { ServerActionError, createServerAction } from "@/lib/action-utils";
import routes from "@/lib/routes";

const onboardAction = createServerAction(
  async (payload: { orgName: string; projectName: string }) => {
    const profile = await updateProfileAction({
      org_name: payload.orgName,
    });

    if (profile.success === false) throw new ServerActionError(profile.error);

    const project = await createProjectAction({
      projectName: payload.projectName,
      projectDescription: "This is a new project",
    });

    if (project.success === false) throw new ServerActionError(project.error);

    return {
      redirectTo: routes.protected.project(project.data.id),
    };
  },
);

export default onboardAction;
