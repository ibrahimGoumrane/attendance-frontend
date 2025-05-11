import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  section_promo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export const createStudentSchema = z.object({
  section_promo: z.string(),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export const updateStudentSchema = z.object({
  id: z.string(),
  section_promo: z.string(),
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email({ message: "Invalid email address" }),
});

export const studentCreateRenderFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "section_promo",
    label: "Section Promo",
    type: "select",
    placeholder: "Enter your section promo",
    required: true,
  },
];
export const studentUpdateRenderFields = [
  {
    name: "id",
    label: "id",
    type: "hidden",
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
    required: true,
  },
  {
    name: "section_promo",
    label: "Section Promo",
    type: "select",
    required: true,
  },
];
