"use server";
import { deleteResource } from "./utils";

export async function deleteStudent(id: string): Promise<boolean> {
  return deleteResource("students", id);
}
