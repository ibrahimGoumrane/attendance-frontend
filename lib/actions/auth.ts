"use server";
import { fetchData } from "@/lib/services/main";
import { State } from "../schemas/base";
import { LoginSchema, SignupSchema } from "../schemas/auth";
import { User } from "../types/user";

export const login = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const parsed = LoginSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { success: false, errors: fieldErrors };
  }
  const { email, password } = parsed.data;
  try {
    await fetchData<User>("/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
};

// Register
export const register = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const raw = {
    user: {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    },
    section_promo: Number(formData.get("section_promo")),
  };
  const parsed = SignupSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return { success: false, errors: fieldErrors };
  }
  const userData = parsed.data;
  try {
    await fetchData<User>("/signup/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return { success: true, errors: {} };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
};
