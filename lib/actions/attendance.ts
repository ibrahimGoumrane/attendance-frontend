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
const data = {
    subject: newAttendance.get("subject") as string,
    student: newAttendance.get("student") as string,
    date: newAttendance.get("date") as string, // Assuming the FormData value is an ISO string
    status: newAttendance.get("status") as "present" | "absent",
};

  return attendanceApiResource.createAction(
    prevState,
    data,
    CreateAttendanceSchema,
    false,
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
  const data = {
    id,
    date: updatedAttendance.get("date") as string,
    status: updatedAttendance.get("status") as "present" | "absent",
  };

  return attendanceApiResource.updateAction(
    prevState,
    data,
    UpdateAttendanceSchema,
    false,
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
