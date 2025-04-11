
import { z } from "zod";
import { userSchema } from "./user";

export const studentSchema = z.object({
  id: z.string(),
  section_promo: z.string(),
  user: userSchema,
});
