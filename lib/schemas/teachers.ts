import { z } from "zod";

export const CreateTeacherSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  firstName: z.string().nonempty("First name is required."),
  lastName: z.string().nonempty("Last name is required"),
  department: z.string().nonempty("Department is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const UpdateTeacherSchema = z.object({
  email: z.string().nonempty("Email is required").email(),
  firstName: z.string().nonempty("First name is required."),
  lastName: z.string().nonempty("Last name is required"),
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
