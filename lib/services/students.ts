"use server";
import { z } from "zod";
import {
  StudentImageFormErrors,
  studentImageFormSchema,
} from "../schemas/students";
import { Student, StudentImage } from "../types/api";
import {
  addResource,
  deleteResource,
  getAllResource,
  getResourceById,
} from "./utils";

export async function getStudentById(id: string): Promise<Student> {
  return getResourceById<Student>("students", id);
}

export async function getStudentImages(id: string): Promise<StudentImage[]> {
  return getAllResource<StudentImage[]>(`images/?student_id=${id}`);
}

export async function addStudentImage(
  studentId: string,
  formData: z.infer<typeof studentImageFormSchema>
) {
  console.log(formData.images);
  const data = new FormData();
  data.append('student_id', studentId);
  for (const file of formData.images) {
    data.append('images', file);
  }
  
  console.log(data);
  return addResource<FormData, StudentImage, StudentImageFormErrors>(
    "images",
    data,
    "Image upload failed."
  );
}

export async function deleteStudent(id: string): Promise<boolean> {
  return deleteResource("students", id);
}
