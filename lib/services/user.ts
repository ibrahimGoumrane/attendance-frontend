import { fetchData } from "./main";
import { User } from "../types/user";

export const getLoggedInUser = async () => {
  try {
    return (await fetchData<User>("/user/")) as User;
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
