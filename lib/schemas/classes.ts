import { z } from "zod";
import { ErrorWithRoot } from "../types/errors";

export const classFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
});

export type ClassFormErrors = ErrorWithRoot<z.infer<typeof classFormSchema>>;
