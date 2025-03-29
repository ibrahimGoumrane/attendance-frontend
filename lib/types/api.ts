import { z } from "zod";
import { userSchema } from "../schemas/user";

export type User = z.infer<typeof userSchema>;

export type Teacher = {
  id: string,
  department: string,
  user: User,
}

export type Class = {
  id: string;
  name: string;
};