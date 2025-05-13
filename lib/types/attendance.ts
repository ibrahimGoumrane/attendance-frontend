import { Student } from "./student";
import { Subject } from "./subject";

export interface Attendance {
  id: string;
  subject: Subject;
  student: Student;
  date: Date;
  status: "present" | "absent";
}
export interface CreateAttendance {
  subject: string;
  student: string;
  date: Date;
  status: "present" | "absent";
}
export interface UpdateAttendance {
  date?: Date;
  status?: "present" | "absent";
}
export interface DeleteAttendance {
  id: string;
}
