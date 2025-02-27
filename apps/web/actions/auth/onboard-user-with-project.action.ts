"use server";

import { createOrganization } from "@/actions/organization/create.action";
import { createProject } from "@/actions/project/create.action";
import { createServerAction, runServerAction } from "@/lib/action-utils";
import { routes } from "@/lib/routes";

export const onboardUserWithProject = createServerAction(
  async (payload: { orgName: string; projectName: string }) => {
    const orgData = await runServerAction(createOrganization, {
      name: payload.orgName,
    });

    await runServerAction(createProject, {
      orgId: orgData.id,
      projectName: payload.projectName,
      projectDescription: "This is a new project",
    });

    return {
      redirectTo: routes.protected.dashboard,
    };
  },
);
