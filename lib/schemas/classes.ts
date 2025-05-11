import { z } from "zod";

export const createClassSchema = z.object({
  name: z.string().nonempty("Name is required"),
});
export const updateClassSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Name is required"),
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
