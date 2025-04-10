"use server";

import { z } from "zod";
import {
  DeparmentFormErrors,
  departmentFormSchema,
} from "../schemas/departments";
import { Department, Teacher } from "../types/api";
import {
  addResource,
  deleteResource,
  editResource,
  getAllResource,
} from "./utils";

export async function getAllDepartments() {
  return getAllResource<Department[]>("departments");
}

export async function getDepartmentTeachers(id: string) {
  return getAllResource<Teacher[]>(`departments/${id}/teachers`);
}

export async function getAllDepartmentsWithTeacherCount() {
  return getAllResource<Department[]>("departments/with-teacher-count");
}

export async function addDepartment(
  formData: z.infer<typeof departmentFormSchema>
) {
  return addResource<
    z.infer<typeof departmentFormSchema>,
    Department,
    DeparmentFormErrors
  >("departments", formData, "Department creation failed");
}

export async function editDepartment(
  id: string,
  formData: z.infer<typeof departmentFormSchema>
) {
  return editResource<
    z.infer<typeof departmentFormSchema>,
    Department,
    DeparmentFormErrors
  >("departments", id, formData, "Department update failed");
}

export async function deleteDepartment(id: string): Promise<boolean> {
  return deleteResource("departments", id);
}
