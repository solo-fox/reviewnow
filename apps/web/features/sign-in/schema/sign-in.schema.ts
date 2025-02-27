"use client";

import { z } from "zod";

const SignInSchema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8),
  })
  .required();

export default SignInSchema;
