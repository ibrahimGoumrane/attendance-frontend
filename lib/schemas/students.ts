import { z } from "zod";
import { userSchema } from "./user";
import { ErrorWithRoot } from "../types/errors";
import { StudentImage } from "../types/api";

const isServer = typeof window === 'undefined'

export const studentSchema = z.object({
  id: z.string(),
  section_promo: z.string(),
  user: userSchema,
});

export const studentImageFormSchema = z.object({
  images: (isServer ? z.any() : z.instanceof(FileList))
    .refine(files => files.length > 0, "Please upload an image.")
    .refine(files => {
      const file = files.item(0);
      return file?.type.startsWith("image/");
    }, "Only image files are allowed"),
  student_id: z.string().optional()
});

export type StudentImageFormErrors = ErrorWithRoot<StudentImage>;