import { Class } from "./api";

export interface ClassGridProps {
  classes: Class[],
  onClassDeleted: (id: string) => void,
  onClassEdited: (cls: Class) => void
}

export interface ClassCardProps {
  cls: Class,
  onClassDeleted: (id: string) => void,
  onClassEdited: (cls: Class) => void
}
