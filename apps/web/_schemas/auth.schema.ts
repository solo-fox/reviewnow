"use client";

import { z } from "zod";

const authSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    terms_accepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .required();

export default authSchema;
