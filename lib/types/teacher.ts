import { CreateUser, UpdateUser, User } from "./user";

export interface Teacher {
  id: string;
  user: User;
  department: string;
}
export interface CreateTeacher {
  user: CreateUser;
  department: string;
}
export interface UpdateTeacher {
  user?: UpdateUser;
  department?: string;
}
export interface DeleteTeacher {
  id: string;
}
