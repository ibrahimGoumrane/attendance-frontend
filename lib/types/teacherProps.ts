import { Department, Teacher } from "./api";

export interface TeacherGridProps {
  teachers: Teacher[],
  departments: Department[],
  onTeacherDeleted: (id: string) => void,
  onTeacherEdited: (teacher: Teacher) => void
}

export interface TeacherCardProps {
  teacher: Teacher,
  departments: Department[],
  onTeacherDeleted: (id: string) => void,
  onTeacherEdited: (teacher: Teacher) => void  
}