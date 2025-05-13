import { Class } from "./class";
import { CreateUser, UpdateUser, User } from "./user";

export interface Student {
  id: string;
  user: User;
  section_promo: Class;
}
export interface CreateStudent {
  user: CreateUser;
  section_promo: string;
}
export interface UpdateStudent {
  user?: UpdateUser;
  section_promo?: string;
}
export interface DeleteStudent {
  id: string;
}
