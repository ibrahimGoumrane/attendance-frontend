import { createApiResource } from "./base";
import { Class } from "../types/class";

export const classApiResource = createApiResource<Class>("classes");
export const getAllClasses = classApiResource.list;
export const getClass = classApiResource.get;
export const addClass = classApiResource.create;
export const editClass = classApiResource.update;
export const deleteClass = classApiResource.delete;
export const getClassStudents = async (id: string) => {
  return classApiResource.getAllResource(`/${id}/students/`);
};
export const getAllClassesWithStudentCount = async () => {
  return classApiResource.getAllResource<Class[]>(`/with-student-count`);
};
