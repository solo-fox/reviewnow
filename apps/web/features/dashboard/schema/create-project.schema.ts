"use client";

import { z } from "zod";

const createProjectSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  projectDescription: z.string().min(2, {
    message: "Project description name must be at least 2 characters.",
  }),
});

export default createProjectSchema;
