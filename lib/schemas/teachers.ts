import { z } from "zod";
import { updateUserSchema, userSchema } from "./users";

export const CreateTeacherSchema = z.object({
  user: userSchema,
  department: z.string().nonempty("Department is required"),
});

export const UpdateTeacherSchema = z.object({
  user: updateUserSchema,
  department: z.string().nonempty("Department is required"),
});
export const DeleteTeacherSchema = z.object({
  id: z.string().nonempty("ID is required"),
});

// Define the form Field
export const teachercreateRenderFields = [
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
    name: "department",
    label: "Department",
    type: "select",
    placeholder: "Enter your department",
    required: true,
  },
];
export const teacherUpdateRenderFields = [
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
    name: "department",
    label: "Department",
    type: "text",
    placeholder: "Enter your department",
    required: true,
  },
];

export const teacherDeleteRenderFields = [
  {
    name: "id",
    label: "id",
    type: "hidden",
  },
];
