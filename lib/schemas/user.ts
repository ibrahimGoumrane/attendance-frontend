import { z } from "zod"

export const sessionSchema = z.object({
  userId: z.string()
})

export const userSchema = z.object({
  email: z.string().email(),
})