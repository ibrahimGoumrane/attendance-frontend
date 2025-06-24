import { Attendance } from "../types/attendance";
import {
  CreateSubject,
  Subject,
  SubjectAttendance,
  UpdateSubject,
} from "../types/subject";
import { createApiResource } from "./base";

export const subjectApiResource = createApiResource<
  Subject,
  CreateSubject,
  UpdateSubject
>("subjects");

export const getAllSubjects = () => subjectApiResource.list();
export const getSubject = (id: string) => subjectApiResource.get(id);
export const addSubject = (data: CreateSubject) =>
  subjectApiResource.create(data);
export const editSubject = (id: string, data: UpdateSubject) =>
  subjectApiResource.update(id, data);
export const deleteSubject = (id: string) => subjectApiResource.delete(id);

export const getSubjectsAttendanceToday = () =>
  subjectApiResource.getAllResource<SubjectAttendance>("attendance-today");

export const getTeacherSubjectsAttendanceToday = (id: string) =>
  subjectApiResource.getAllResource<SubjectAttendance>(`attendance-today/teacher/${id}/`);

export const getSubjectAttendance = (id: string) =>
  subjectApiResource.getAllResource<Attendance>(`${id}/attendance/`);