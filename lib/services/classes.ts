import { Class } from "../types/api";
import { getAllResource } from "./utils";

export async function getAllClasses() {
  return getAllResource<Class[]>('classes');
}