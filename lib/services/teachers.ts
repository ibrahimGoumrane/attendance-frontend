"use server";

import { z } from "zod";
import { Teacher } from "../types/api";
import { getAllResource } from "./utils";
import {
  teacherEndpointRequestSchema,
  teacherFormSchema,
} from "../schemas/auth";
import { serverFetch } from "../serverUtils";

export async function getAllTeachers() {
  return getAllResource<Teacher[]>("teachers");
}

export async function addTeacher(formData: z.infer<typeof teacherFormSchema>) {
  const { success, data } = teacherEndpointRequestSchema.safeParse(formData);
  if (!success) {
    return "Teacher account creation failed";
  }
  const response = await serverFetch(`${process.env.API_URL}/teachers/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  if (!response.ok) {
    return "Teacher account creation failed";
  }
}
