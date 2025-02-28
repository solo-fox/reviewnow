"use client";

import { z } from "zod";

export const SignInSchema = z
  .object({
    email: z.string().email().trim(),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .max(20, "Password must be less than 20 characters long")
  })
  .required();
