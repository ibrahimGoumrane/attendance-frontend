"use server";

import { State } from "../schemas/base";
import { redirect } from "next/navigation";
import { subjectApiResource } from "../services/subject";
import {
  CreateSubjectSchema,
  UpdateSubjectSchema,
  DeleteSubjectSchema,
} from "../schemas/subjects";

/**
 * Add a new subject
 */
export const addSubject = async (prevState: State, newSubject: FormData) => {
  return subjectApiResource.createAction(
    prevState,
    newSubject,
    CreateSubjectSchema,
    true,
    ["/admin/subjects"] // Path to revalidate
  );
};

/**
 * Edit an existing subject
 */
export const editSubject = async (
  prevState: State,
  updatedSubject: FormData
) => {
  const id = updatedSubject.get("id") as string;

  return subjectApiResource.updateAction(
    prevState,
    updatedSubject,
    UpdateSubjectSchema,
    true,
    ["/admin/subjects", `/admin/subjects/${id}`] // Multiple paths to revalidate
  );
};

/**
 * Delete a subject
 */
export const deleteSubject = async (prevState: State, formData: FormData) => {
  await subjectApiResource.deleteAction(
    prevState,
    formData,
    DeleteSubjectSchema,
    ["/admin/subjects"]
  );
  redirect("/admin/subjects");
};
