import { Class } from "./class";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Subject {
  id: string;
  name: string;
  teacher: Teacher;
  section_promo: Class;
}
export interface CreateSubject {
  name: string;
  teacher: string;
  section_promo: string;
}
export interface UpdateSubject {
  name?: string;
  teacher?: string;
  section_promo?: string;
}
export interface DeleteSubject {
  id: string;
}
export interface SubjectAttendance {
  subject: Subject;
  date: string;
  presentStudents: number;
  absentStudents: Array<Student>;
}
