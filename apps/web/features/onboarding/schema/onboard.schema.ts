"use client";

import { z } from "zod";

const onboardSchema = z.object({
  orgName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
});

export default onboardSchema;
