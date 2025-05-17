"use server";

import { State } from "../schemas/base";
import { redirect } from "next/navigation";
import { departmentApiResource } from "../services/departments";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  deleteDepartmentSchema,
} from "../schemas/departments";

/**
 * Add a new department
 */
export const addDepartment = async (
  prevState: State,
  newDepartment: FormData
) => {
  return departmentApiResource.createAction(
    prevState,
    newDepartment,
    createDepartmentSchema,
    true,
    ["/admin/departments"] // Path to revalidate
  );
};

/**
 * Edit an existing department
 */
export const editDepartment = async (
  prevState: State,
  updatedDepartment: FormData
) => {
  const id = updatedDepartment.get("id") as string;

  return departmentApiResource.updateAction(
    prevState,
    updatedDepartment,
    updateDepartmentSchema,
    true,
    ["/admin/departments", `/admin/departments/${id}`]
  );
};

/**
 * Delete a department
 */
export const deleteDepartment = async (
  prevState: State,
  formData: FormData
) => {
  await departmentApiResource.deleteAction(
    prevState,
    formData,
    deleteDepartmentSchema,
    ["/admin/departments"]
  );
  redirect("/admin/departments");
};
