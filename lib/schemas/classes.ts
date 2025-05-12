import { z } from "zod";

export const CreateClassSchema = z.object({
  name: z.string().nonempty("Name is required"),
});
export const UpdateClassSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Name is required"),
});
export const DeleteClassSchema = z.object({
  id: z.string().nonempty("ID is required"),
});
export const classCreateRenderFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter the class name",
    required: true,
  },
];
export const classUpdateRenderFields = [
  {
    name: "id",
    label: "id",
    type: "hidden",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter the class name",
    required: true,
  },
];
