import { Teacher } from "./api";

export interface TeacherGridProps {
  teachers: Teacher[],
  onTeacherDeleted: (id: string) => void,
  onTeacherEdited: (teacher: Teacher) => void
}

export interface TeacherCardProps {
  teacher: Teacher,
  onTeacherDeleted: (id: string) => void,
  onTeacherEdited: (teacher: Teacher) => void  
}