import { z } from "zod";

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

export const registerEndpointRequestSchema = registerFormSchema.transform(
  ({ email, firstName, lastName, password, section_promo }) => ({
    user: { email, firstName, lastName, password },
    section_promo,
  })
);
