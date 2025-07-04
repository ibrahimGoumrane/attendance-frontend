"use server";

import { State } from "../schemas/base";
import { redirect } from "next/navigation";
import { attendanceApiResource } from "../services/attendances";
import {
  CreateAttendanceSchema,
  UpdateAttendanceSchema,
  DeleteAttendanceSchema,
} from "../schemas/attendances";
import { SubjectAttendanceProcessResponse } from "../types/attendance";

// Helper function to construct revalidation paths based on role
const getRevalidationPaths = (basePath: string, id?: string): string[] => {
  const paths = [`${basePath}/attendances`];
  if (id) {
    paths.push(`${basePath}/attendances/${id}`);
  }
  return paths;
};

/**
 * Add a new attendance record
 */
export const addAttendance = async (
  prevState: State,
  newAttendance: FormData,
  role: "admin" | "teacher" = "admin" // Default to admin
) => {
  const basePath = role === "admin" ? "/admin" : "/teacher";
  return attendanceApiResource.createAction(
    prevState,
    newAttendance,
    CreateAttendanceSchema,
    true,
    getRevalidationPaths(basePath)
  );
};

/**
 * Edit an existing attendance record
 */
export const editAttendance = async (
  prevState: State,
  updatedAttendance: FormData,
  role: "admin" | "teacher" = "admin" // Default to admin
) => {
  const id = updatedAttendance.get("id") as string;
  const basePath = role === "admin" ? "/admin" : "/teacher";
  return attendanceApiResource.updateAction(
    prevState,
    updatedAttendance,
    UpdateAttendanceSchema,
    true,
    getRevalidationPaths(basePath, id)
  );
};

/**
 * Delete an attendance record
 */
export const deleteAttendance = async (
  prevState: State,
  formData: FormData,
  role: "admin" | "teacher" = "admin" // Default to admin
) => {
  const basePath = role === "admin" ? "/admin" : "/teacher";
  await attendanceApiResource.deleteAction(
    prevState,
    formData,
    DeleteAttendanceSchema,
    getRevalidationPaths(basePath)
  );
  redirect(`${basePath}/attendances`);
};

/**
 * Confirm attendance records
 */
export const confirmAttendance = async (
  data: FormData | object,
) => {
  try {
    await attendanceApiResource.customPost('confirm', data);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

/**
 * Process attendance images
 */
export const processAttendanceImages = async (
  data: FormData,
) => {
  try {
    console.log("Preparing request data:", data);
    const response = await attendanceApiResource.customPost<SubjectAttendanceProcessResponse>('process', data);
    return { success: true, data: response, error: null };
  } catch (error) {
    return { success: false, data: null, error: (error as Error).message };
  }
}