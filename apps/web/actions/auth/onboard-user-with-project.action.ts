"use server";

import { createOrganizationAction } from "@/actions/organization/create-organization.action";
import { createProjectAction } from "@/actions/project/create-project.action";
import { createServerAction, runServerAction } from "@/lib/action-utils";
import { routes } from "@/lib/routes";

export const onboardUserWithProjectAction = createServerAction(
  async (payload: { orgName: string; projectName: string }) => {
    const orgData = await runServerAction(createOrganizationAction, {
      name: payload.orgName,
    });

    await runServerAction(createProjectAction, {
      orgId: orgData.id,
      projectName: payload.projectName,
      projectDescription: "This is a new project",
    });

    return {
      redirectTo: routes.protected.dashboard,
    };
  },
);
