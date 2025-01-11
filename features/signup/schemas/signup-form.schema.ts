"use client"

import { z } from "zod"

const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
}).required()

export default signUpFormSchema
