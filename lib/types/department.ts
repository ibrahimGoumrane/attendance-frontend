export interface Department {
  id: string;
  name: string;
  description?: string;
  teacherCount?: number;
}
export interface CreateDepartment {
  name: string;
  description?: string;
}
export interface UpdateDepartment {
  name?: string;
  description?: string;
}
export interface DeleteDepartment {
  id: string;
}
export interface DepartmentAttendance {
  attendance: number;
  department: string;
}
