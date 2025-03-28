"use server";

import { z } from "zod";
import { loginFormSchema, registerEndpointRequestSchema, registerFormSchema } from "../schemas/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "../types";

const SESSION_COOKIE_NAME = "sessionid";
const CSRF_TOKEN_NAME = "csrftoken";

export async function login(formData: z.infer<typeof loginFormSchema>) {
  const { success, data } = loginFormSchema.safeParse(formData);
  if (!success) {
    return "Login failed. Please try again."
  }
  const response = await fetch(`${process.env.API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const user : User = await response.json();
  console.log(user);
  if (!response.ok) {
    return "Account creation failed. Please try again.";
  }
  const cookieStore = await cookies();
  const setCookies = response.headers.getSetCookie();

  if (setCookies) {
    const sessionCookie = setCookies.find((header) => header.startsWith(SESSION_COOKIE_NAME));
    if (sessionCookie) {
      const sessionValue = sessionCookie.split("=")[1].split(";")[0];
      cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    const csrfCookie = setCookies.find((header) => header.startsWith(CSRF_TOKEN_NAME));
    if (csrfCookie) {
      const csrfValue = csrfCookie.split("=")[1].split(";")[0];
      cookieStore.set(CSRF_TOKEN_NAME, csrfValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }
  } else {
    console.error("No cookies present in the response.");
  }
  switch (user.role) {
    case 'admin':
      redirect("/admin");
    case 'student':
      redirect("/student");
    case 'teacher':
      redirect("/teacher");
  }
}

export async function register(formData: z.infer<typeof registerFormSchema>) {
  const { success, data } = registerEndpointRequestSchema.safeParse(formData);
  if (!success) {
    return "Account creation failed.";
  }

  const response = await fetch(`${process.env.API_URL}/signup/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  if (!response.ok) {
    return "Account creation failed. Please try again.";
  }

  const cookieStore = await cookies();
  const setCookies = response.headers.getSetCookie();

  if (setCookies) {
    const sessionCookie = setCookies.find((header) => header.startsWith(SESSION_COOKIE_NAME));
    if (sessionCookie) {
      const sessionValue = sessionCookie.split("=")[1].split(";")[0];
      cookieStore.set(SESSION_COOKIE_NAME, sessionValue, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    const csrfCookie = setCookies.find((header) => header.startsWith(CSRF_TOKEN_NAME));
    if (csrfCookie) {
      const csrfValue = csrfCookie.split("=")[1].split(";")[0];
      cookieStore.set(CSRF_TOKEN_NAME, csrfValue, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }
  } else {
    console.error("No cookies present in the response.");
  }

  redirect("/student");
}
