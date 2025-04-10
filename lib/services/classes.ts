"use server"

import { Class } from "../types/api";
import { getAllResource } from "./utils";

export async function getAllClasses() {
  return getAllResource<Class[]>('classes');
}

export async function getAllClassesWithStudentCount() {
  return getAllResource<Class[]>('classes/with-student-count')
}