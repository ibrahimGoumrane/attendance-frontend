import { z } from "zod";

export const createDepartmentSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});
export const updateDepartmentSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
});
export const deleteDepartmentSchema = z.object({
  id: z.string().nonempty("ID is required"),
});

export const departmentCreateRenderFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter the department name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter the department description",
    required: false,
  },
];
export const departmentUpdateRenderFields = [
  {
    name: "id",
    label: "id",
    type: "hidden",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter the department name",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter the department description",
    required: false,
  },
];

export const departmentDeleteRenderFields = [
  {
    name: "id",
    label: "ID",
    type: "hidden",
  },
];

