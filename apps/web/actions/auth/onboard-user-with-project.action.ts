"use server";

import { updateProfile } from "@/actions/profile/update.action";
import { createProject } from "@/actions/project/create.action";
import { createServerAction, runServerAction } from "@/lib/action-utils";
import { routes } from "@/lib/routes";

export const onboardUserWithProject = createServerAction(
  async (payload: { orgName: string; projectName: string }) => {
    await runServerAction(updateProfile, {
      org_name: payload.orgName,
    });

    const projectData = await runServerAction(createProject, {
      projectName: payload.projectName,
      projectDescription: "This is a new project",
    });

    return {
      redirectTo: routes.protected.project(projectData.id),
    };
  },
);
