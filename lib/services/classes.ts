"use server";

import { z } from "zod";
import { Class, Student } from "../types/api";
import { addResource, getAllResource, getResourceById } from "./utils";
import { ClassFormErrors, classFormSchema } from "../schemas/classes";

export async function getAllClasses() {
  return getAllResource<Class[]>("classes");
}

export async function getClassById(id: string) {
  // Weird work around with the id because the shape of the url is /api/classes/id/with-student-count
  // Fix later?
  return getResourceById<Class>(`classes/${id}/with-student-count`, '');
}

export async function getClassStudents(id: string) {
  return getAllResource<Student[]>(`classes/${id}/students`);
}

export async function getAllClassesWithStudentCount() {
  return getAllResource<Class[]>("classes/with-student-count");
}

export async function addClass(formData: z.infer<typeof classFormSchema>) {
  return addResource<typeof formData, Class, ClassFormErrors>(
    "classes",
    formData,
    "Class creation failed."
  );
}
