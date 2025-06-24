export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "student" | "teacher";
  created_at: string;
  updated_at: string;
  latest_image?: StudentImage;
}
export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
}
export interface DeleteUser {
  id: string;
}

export type StudentImage = {
  id: string;
  image: string;
  is_encoded: boolean;
  uploaded_at: string;
};
