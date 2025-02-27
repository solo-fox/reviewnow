"use client";

import { z } from "zod";

const profileSchema = z
  .object({
    orgName: z
      .string()
      .min(2, { message: "Organization Name must be at least 2 characters." })
      .optional(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.orgName && !data.password) {
      ctx.addIssue({
        code: "custom",
        message: "Please provide either an Organization Name or a Password.",
        path: ["orgName"],
      });
      ctx.addIssue({
        code: "custom",
        message: "Please provide either an Organization Name or a Password.",
        path: ["password"],
      });
    }
  });

export default profileSchema;
