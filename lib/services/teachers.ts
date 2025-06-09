import { createApiResource } from "./base";
import { CreateTeacher, Teacher, UpdateTeacher } from "../types/teacher";
import { Attendance } from "../types/attendance";
import { Subject } from "../types/subject";
import { Total } from "../types/base";

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
export const getTeacherTotalStudents = async (id: string) => teacherApiResource.getResource<Total>(`${id}/total/students/`);
export const getTeacherTotalSubjects = async (id: string) => teacherApiResource.getResource<Total>(`${id}/total/subjects/`);
export const getTeacherTotalClasses = async (id: string) => teacherApiResource.getResource<Total>(`${id}/total/classes/`);