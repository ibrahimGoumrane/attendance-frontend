"use server";

import { z } from "zod";
import { Teacher } from "../types/api";
import { getAllResource } from "./utils";
import {
  teacherEndpointRequestSchema,
  TeacherFormErrors,
  teacherFormSchema,
} from "../schemas/teachers";
import { serverFetch } from "../serverUtils";

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
  const response = await serverFetch(`${process.env.API_URL}/teachers/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  if (!response.ok) {
    return {
      success: false,
      errors: jsonResponse.error || { root: "Teacher account creation failed" },
    };
  }
  return { success: true, data: jsonResponse as Teacher };
}

export async function deleteTeacher(id : string) : Promise<boolean> {
  const response = await serverFetch(`${process.env.API_URL}/teachers/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    return false;
  }
  return true;
} 
