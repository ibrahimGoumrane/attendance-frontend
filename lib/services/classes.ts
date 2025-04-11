"use server";

import { z } from "zod";
import { Class } from "../types/api";
import { addResource, getAllResource, getResourceById } from "./utils";
import { ClassFormErrors, classFormSchema } from "../schemas/classes";

export async function getAllClasses() {
  return getAllResource<Class[]>("classes");
}

export async function getClassById(id: string) {
  return getResourceById<Class>("classes", id);
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
