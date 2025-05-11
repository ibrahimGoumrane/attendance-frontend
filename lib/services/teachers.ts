import { createApiResource } from "./base";
import { CreateTeacher, Teacher, UpdateTeacher } from "../types/teacher";

export const teacherApiResource = createApiResource<
  Teacher,
  CreateTeacher,
  UpdateTeacher
>("teachers");
export const getAllTeachers = () => teacherApiResource.list();
export const getTeacher = (id: string) => teacherApiResource.get(id);
export const addTeacher = (data: CreateTeacher) =>
  teacherApiResource.create(data);
export const editTeacher = (id: string, data: UpdateTeacher) =>
  teacherApiResource.update(id, data);
