import {z} from "zod";
import { ErrorWithRoot } from "../types/errors";
import { userSchema } from "./user";

export const teacherSchema = z.object({
  id: z.string(),
  department: z.string(),
  user: userSchema,
});

export const teacherFormSchema = z
  .object({
    email: z.string().nonempty("Email is required").email(),
    firstName: z.string().nonempty("First name is required."),
    lastName: z.string().nonempty("Last name is required"),
    department: z.string().nonempty("Department is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const editTeacherFormSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  firstName: z.string().nonempty("First name is required."),
  lastName: z.string().nonempty("Last name is required"),
  department: z.string().nonempty("Department is required"),
})

export type TeacherFormErrors = ErrorWithRoot<z.infer<typeof teacherFormSchema>>
export type EditTeacherFormErrors = ErrorWithRoot<z.infer<typeof editTeacherFormSchema>>

export const teacherEndpointRequestSchema = teacherFormSchema.transform(
  ({ email, firstName, lastName, password, department }) => ({
    user: { email, firstName, lastName, password },
    department,
  })
);

export const editTeacherEndpointRequestSchema = editTeacherFormSchema.transform(
  ({ email, firstName, lastName, department }) => ({
    user: { email, firstName, lastName },
    department,
  })
);
