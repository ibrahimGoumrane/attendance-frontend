import { createApiResource } from "./base";
import { CreateTeacher, Teacher, UpdateTeacher } from "../types/teacher";
import { Attendance } from "../types/attendance";
import { Subject } from "../types/subject";

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
export const getTeacherAttendance = (id: string): Promise<Attendance[]> =>
  teacherApiResource.getAllResource(`${id}/attendance/`);
export const getTeacherSubjects = (id: string): Promise<Subject[]> =>
  teacherApiResource.getAllResource(`${id}/subjects/`);
