"use server";

import { State } from "../schemas/base";
import { redirect } from "next/navigation";
import { classApiResource } from "../services/classes";
import {
  CreateClassSchema,
  UpdateClassSchema,
  DeleteClassSchema,
} from "../schemas/classes"; // You'll need to create these schemas

/**
 * Add a new class
 */
export const addClass = async (prevState: State, newClass: FormData) => {
  const data = {
    name: newClass.get("name") as string,
  };

  return classApiResource.createAction(
    prevState,
    data,
    CreateClassSchema,
    false,
    ["/admin/classes"] // Path to revalidate
  );
};

/**
 * Edit an existing class
 */
export const editClass = async (prevState: State, updatedClass: FormData) => {
  const id = updatedClass.get("id") as string;
  const data = {
    id,
    name: updatedClass.get("name") as string,
  };

  return classApiResource.updateAction(
    prevState,
    data,
    UpdateClassSchema,
    false,
    ["/admin/classes", `/admin/classes/${id}`] // Multiple paths to revalidate
  );
};

/**
 * Delete a class
 */
export const deleteClass = async (prevState: State, formData: FormData) => {
  await classApiResource.deleteAction(prevState, formData, DeleteClassSchema, [
    "/admin/classes",
  ]);
  redirect("/admin/classes");
};
