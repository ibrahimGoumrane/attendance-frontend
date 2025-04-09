import { z } from "zod";
import { ErrorWithRoot } from "../types/errors";

export const departmentFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().optional(),
})

export type DeparmentFormErrors = ErrorWithRoot<z.infer<typeof departmentFormSchema>>