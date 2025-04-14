import { Department } from "./api";

export interface DepartmentGridProps {
  departments: Department[],
  onDepartmentDeleted: (id: string) => void,
  onDepartmentEdited: (department: Department) => void
}

export interface DepartmentCardProps {
  department: Department,
}
