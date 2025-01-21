"use client"

import { z } from "zod"

const onboardingSchema = z.object({
  org_name: z.string()
}).required()

export default onboardingSchema
