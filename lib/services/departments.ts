"use server"

import { z } from "zod";
import { DeparmentFormErrors, departmentFormSchema } from "../schemas/departments";
import { serverFetch } from "../serverUtils";
import { Department, Teacher } from "../types/api";
import { deleteResource, getAllResource } from "./utils";

export async function getAllDepartments() {
  return getAllResource<Department[]>('departments');
}

export async function getDepartmentTeachers(id : string) {
  return getAllResource<Teacher[]>(`departments/${id}/teachers`)
}

export async function getAllDepartmentsWithTeacherCount() {
  return getAllResource<Department[]>('departments/with-teacher-count');
}

export async function addDepartment(
  formData: z.infer<typeof departmentFormSchema>
): Promise<
  | { success: true; data: Department }
  | { success: false; errors: DeparmentFormErrors }
> {

  const response = await serverFetch(`${process.env.API_URL}/departments/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse);

  if (!response.ok) {
    return {
      success: false,
      errors: jsonResponse.error || { root: "Department creation failed" },
    };
  }

  return { success: true, data: jsonResponse as Department };
}

export async function deleteDepartment(id: string): Promise<boolean> {
  return deleteResource("departments", id);
}