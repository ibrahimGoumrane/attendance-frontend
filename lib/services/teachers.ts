import { Teacher } from "../types/api";
import { getAllResource } from "./utils";

export async function getAllTeachers() {
  return getAllResource<Teacher[]>("teachers");
}