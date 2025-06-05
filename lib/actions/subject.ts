"use server";

import { State } from "../schemas/base";
import { redirect } from "next/navigation";
import { subjectApiResource } from "../services/subject";
import {
  CreateSubjectSchema,
  UpdateSubjectSchema,
  DeleteSubjectSchema,
} from "../schemas/subjects";

// Helper function to construct revalidation paths based on role
const getRevalidationPaths = (basePath: string, id?: string): string[] => {
  const paths = [`${basePath}/subjects`];
  if (id) {
    paths.push(`${basePath}/subjects/${id}`);
  }
  return paths;
};

/**
 * Add a new subject
 */
export const addSubject = async (
  prevState: State,
  newSubject: FormData,
  role: "admin" | "teacher" = "admin" // Default to admin
) => {
  const basePath = role === "admin" ? "/admin" : "/teacher";
  return subjectApiResource.createAction(
    prevState,
    newSubject,
    CreateSubjectSchema,
    true,
    getRevalidationPaths(basePath) // Dynamic revalidation paths
  );
};

/**
 * Edit an existing subject
 */
export const editSubject = async (
  prevState: State,
  updatedSubject: FormData,
  role: "admin" | "teacher" = "admin" // Default to admin
) => {
  const id = updatedSubject.get("id") as string;
  const basePath = role === "admin" ? "/admin" : "/teacher";
  return subjectApiResource.updateAction(
    prevState,
    updatedSubject,
    UpdateSubjectSchema,
    true,
    getRevalidationPaths(basePath, id) // Dynamic revalidation paths with ID
  );
};

/**
 * Delete a subject
 */
export const deleteSubject = async (
  prevState: State,
  formData: FormData,
  role: "admin" | "teacher" = "admin" // Default to admin
) => {
  const basePath = role === "admin" ? "/admin" : "/teacher";
  await subjectApiResource.deleteAction(
    prevState,
    formData,
    DeleteSubjectSchema,
    getRevalidationPaths(basePath)
  );
  redirect(`${basePath}/subjects`);
};