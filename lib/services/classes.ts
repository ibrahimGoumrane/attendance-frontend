import { createApiResource } from "./base";
import { Class } from "../types/class";

export const classApiResource = createApiResource<Class>("classes");
export const getAllClasses = () => classApiResource.list();
export const getClass = (id: string) => classApiResource.get(id);
export const addClass = (data: Class) => classApiResource.create(data);
export const editClass = (id: string, data: Partial<Class>) =>
  classApiResource.update(id, data);
export const deleteClass = (id: string) => classApiResource.delete(id);
export const getClassStudents = async (id: string) => {
  return classApiResource.getAllResource(`/${id}/students/`);
};
export const getAllClassesWithStudentCount = async () => {
  return classApiResource.getAllResource<Class>(`/with-student-count`);
};
