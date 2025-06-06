import { Student } from "./student";
import { Subject } from "./subject";

export interface Attendance {
  id: string;
  subject: Subject;
  student: Student;
  date: string;
  status: "present" | "absent";
}
export interface CreateAttendance {
  subject: string;
  student: string;
  date: string;
  status: "present" | "absent";
}
export interface UpdateAttendance {
  date?: string;
  status?: "present" | "absent";
}
export interface DeleteAttendance {
  id: string;
}
export interface DailyAttendance {
  date: string;
  attendance: number;
}
export interface AttendanceHourlyData {
  hour_range: string;
  attendance: number;
}

export interface AttendanceHourlyWeek {
  day: string;
  date: string;
  hourly_data: AttendanceHourlyData[];
}