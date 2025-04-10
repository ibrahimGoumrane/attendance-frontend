"use server";

import { z } from "zod";
import { Teacher } from "../types/api";
import {
  addResource,
  deleteResource,
  editResource,
  getAllResource,
} from "./utils";
import {
  editTeacherEndpointRequestSchema,
  EditTeacherFormErrors,
  editTeacherFormSchema,
  teacherEndpointRequestSchema,
  TeacherFormErrors,
  teacherFormSchema,
} from "../schemas/teachers";

export async function getAllTeachers() {
  return getAllResource<Teacher[]>("teachers");
}

export async function addTeacher(
  formData: z.infer<typeof teacherFormSchema>
): Promise<
  | { success: true; data: Teacher }
  | { success: false; errors: TeacherFormErrors }
> {
  const { success, data } = teacherEndpointRequestSchema.safeParse(formData);

  if (!success) {
    return {
      success: false,
      errors: { root: "Teacher account creation failed" },
    };
  }

  return addResource<typeof data, Teacher, TeacherFormErrors>(
    "teachers",
    data,
    "Teacher account creation failed"
  );
}

export async function editTeacher(
  id: string,
  formData: z.infer<typeof editTeacherFormSchema>
): Promise<
  | { success: true; data: Teacher }
  | { success: false; errors: EditTeacherFormErrors }
> {
  const { success, data } =
    editTeacherEndpointRequestSchema.safeParse(formData);

  if (!success) {
    return {
      success: false,
      errors: { root: "Teacher account editing failed" },
    };
  }

  return editResource<typeof data, Teacher, EditTeacherFormErrors>(
    "teachers",
    id,
    data,
    "Teacher account editing failed"
  );
}

export async function deleteTeacher(id: string): Promise<boolean> {
  return deleteResource("teachers", id);
}
