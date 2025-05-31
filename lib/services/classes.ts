import { createApiResource } from "./base";
import { Class, CreateClass, UpdateClass } from "../types/class";
import { Student } from "../types/student";
import { Attendance } from "../types/attendance";
import { Subject } from "../types/subject";
import { Total } from "../types/base";

export const classApiResource = createApiResource<
  Class,
  CreateClass,
  UpdateClass
>("classes");
export const getAllClasses = () => classApiResource.list();
export const getClass = (id: string) => classApiResource.get(id);
export const addClass = (data: Class) => classApiResource.create(data);
export const editClass = (id: string, data: Partial<Class>) =>
  classApiResource.update(id, data);
export const deleteClass = (id: string) => classApiResource.delete(id);
export const getClassStudents = async (id: string) => {
  return classApiResource.getAllResource<Student>(`/${id}/students/`);
};

export const getClassAttendance = async (id: string) => {
  return classApiResource.getAllResource<Attendance>(`/${id}/attendance/`);
};
export const getClassSubjects = async (id: string) => {
  return classApiResource.getAllResource<Subject>(`/${id}/subjects/`);
};

export const getTotalClasses = async () =>
  classApiResource.getResource<Total>("total");
