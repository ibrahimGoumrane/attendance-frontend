export interface Class {
  id: string;
  name: string;
  studentCount: number;
}
export interface CreateClass {
  name: string;
}
export interface UpdateClass {
  name?: string;
}
export interface DeleteClass {
  id: string;
}
