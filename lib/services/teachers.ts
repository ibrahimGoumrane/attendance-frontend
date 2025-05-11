import { createApiResource } from "./base";
import { CreateTeacher, Teacher, UpdateTeacher } from "../types/teacher";

export const teacherApiResource = createApiResource<
  Teacher,
  CreateTeacher,
  UpdateTeacher
>("teachers");
export const getAllTeachers = teacherApiResource.list;
export const addTeacher = teacherApiResource.create;
export const editTeacher = teacherApiResource.update;
export const deleteTeacher = teacherApiResource.delete;
