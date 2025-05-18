import { z } from "zod";

export const CreateSubjectSchema = z.object({
  name: z.string().nonempty("Name is required"),
  teacher_id: z.string().nonempty("Teacher is required"),
  section_promo_id: z.string().nonempty("Section/Promo is required"),
});

export const UpdateSubjectSchema = z.object({
  id: z.string().nonempty("ID is required"),
  name: z.string().nonempty("Name is required"),
  teacher_id: z.string().nonempty("Teacher is required"),
  section_promo_id: z.string().nonempty("Section/Promo Id is required"),
});

export const DeleteSubjectSchema = z.object({
  id: z.string().nonempty("ID is required"),
});

export const subjectCreateRenderFields = [
  {
    name: "name",
    label: "Subject Name",
    type: "text",
    placeholder: "Enter the subject name",
    required: true,
  },
  {
    name: "teacher_id",
    label: "Teacher",
    type: "select",
    required: true,
  },
  {
    name: "section_promo_id",
    label: "Section/Promo",
    type: "select",
    required: true,
  },
];

export const subjectUpdateRenderFields = [
  {
    name: "id",
    label: "ID",
    type: "hidden",
  },
  {
    name: "name",
    label: "Subject Name",
    type: "text",
    placeholder: "Enter the subject name",
    required: true,
  },
  {
    name: "teacher_id",
    label: "Teacher",
    type: "select",
    placeholder: "Select a teacher",
    required: true,
  },
  {
    name: "section_promo_id",
    label: "Section/Promo",
    type: "select",
    required: true,
  },
];

export const subjectDeleteRenderFields = [
  {
    name: "id",
    label: "ID",
    type: "hidden",
  },
];
