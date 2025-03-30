import { z } from "zod";
import { ErrorWithRoot } from "../types/errors";

export const loginFormSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string(),
});

export const registerFormSchema = z
  .object({
    email: z.string().nonempty("Email is required").email(),
    firstName: z.string().nonempty("First name is required."),
    lastName: z.string().nonempty("Last name is required"),
    section_promo: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const teacherFormSchema = z
  .object({
    email: z.string().nonempty("Email is required").email(),
    firstName: z.string().nonempty("First name is required."),
    lastName: z.string().nonempty("Last name is required"),
    department: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TeacherFormErrors = ErrorWithRoot<z.infer<typeof teacherFormSchema>>

export const teacherEndpointRequestSchema = teacherFormSchema.transform(
  ({ email, firstName, lastName, password, department }) => ({
    user: { email, firstName, lastName, password },
    department,
  })
);

export const registerEndpointRequestSchema = registerFormSchema.transform(
  ({ email, firstName, lastName, password, section_promo }) => ({
    user: { email, firstName, lastName, password },
    section_promo,
  })
);
