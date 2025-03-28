import { z } from "zod"

export const sessionSchema = z.object({
  userId: z.string()
})

export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "student", "teacher"]),
  firstName: z.string(),
  lastName: z.string(),
})