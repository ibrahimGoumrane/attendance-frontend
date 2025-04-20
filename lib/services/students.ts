"use server";
import { Student, StudentImage } from "../types/api";
import { deleteResource, getAllResource, getResourceById } from "./utils";

export async function getStudentById(id: string): Promise<Student> {
  return getResourceById<Student>("students", id);
}

export async function getStudentImages(id: string): Promise<StudentImage[]> {
  return getAllResource<StudentImage[]>(`images/?student_id=${id}`);
}

export async function deleteStudent(id: string): Promise<boolean> {
  return deleteResource("students", id);
}
