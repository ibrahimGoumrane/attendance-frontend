"use server"

import { Department } from "../types/api";
import { getAllResource } from "./utils";

export async function getAllDepartments() {
  return getAllResource<Department[]>('departments');
}

export async function getAllDepartmentsWithTeacherCount() {
  return getAllResource<Department[]>('departments/with-teacher-count');
}