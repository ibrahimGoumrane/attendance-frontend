import { z } from "zod";
import { updateUserSchema, userSchema } from "./users";

export const studentSchema = z.object({
  id: z.string(),
  section_promo: z.string(),
  user: userSchema,
});

export const createStudentSchema = z.object({
  section_promo: z.string(),
  user: userSchema,
});
export const updateStudentSchema = z.object({
  id: z.string(),
  section_promo: z.string(),
  user: updateUserSchema,
});

export const deleteStudentSchema = z.object({
  id: z.string().nonempty("ID is required"),
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

export const studentDeleteRenderFields = [
  {
    name: "id",
    label: "ID",
    type: "hidden",
  },
];
