import { fetchData } from "./main";
import { User } from "../types/user";
import { Teacher } from "../types/teacher";
import { Student } from "../types/student";

export const getLoggedInUser = async () => {
  try {
    return (await fetchData<User>("/user/")) as User;
  } catch {
    return null;
  }
};

export const getLoggedInTeacher = async () => {
  try {
    return (await fetchData<Teacher>("/user/teacher/")) as Teacher;
  } catch {
    return null;
  }
};

export const getLoggedInStudent = async () => {
  try {
    return (await fetchData<Student>("/user/student/")) as Student;
  } catch {
    return null;
  }
};

// Logout
export const logout = async (): Promise<boolean> => {
  await fetchData("/logout/", {
    method: "POST",
  });
  return true;
};
