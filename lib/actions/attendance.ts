"use server";

import { State } from "../schemas/base";
import { redirect } from "next/navigation";
import { attendanceApiResource } from "../services/attendances";
import {
  CreateAttendanceSchema,
  UpdateAttendanceSchema,
  DeleteAttendanceSchema,
} from "../schemas/attendances";

/**
 * Add a new attendance record
 */
export const addAttendance = async (
  prevState: State,
  newAttendance: FormData
) => {
  console.log("Adding attendance", newAttendance);
  return attendanceApiResource.createAction(
    prevState,
    newAttendance,
    CreateAttendanceSchema,
    true,
    ["/admin/attendances"] // Path to revalidate
  );
};

/**
 * Edit an existing attendance record
 */
export const editAttendance = async (
  prevState: State,
  updatedAttendance: FormData
) => {
  const id = updatedAttendance.get("id") as string;

  return attendanceApiResource.updateAction(
    prevState,
    updatedAttendance,
    UpdateAttendanceSchema,
    true,
    ["/admin/attendances", `/admin/attendances/${id}`] // Multiple paths to revalidate
  );
};

/**
 * Delete an attendance record
 */
export const deleteAttendance = async (
  prevState: State,
  formData: FormData
) => {
  await attendanceApiResource.deleteAction(
    prevState,
    formData,
    DeleteAttendanceSchema,
    ["/admin/attendances"]
  );
  redirect("/admin/attendances");
};
