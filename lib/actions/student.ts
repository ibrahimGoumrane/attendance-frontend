"use server";

import { redirect } from "next/navigation";
import { State } from "../schemas/base";
import { createStudentSchema, updateStudentSchema, deleteStudentSchema } from "../schemas/students";
import { studentApiResource } from "../services/students";

export const addStudent = async (prevState: State, newStudent: FormData) => {
  const data = {
    user: {
      firstName: newStudent.get("firstName") as string,
      lastName: newStudent.get("lastName") as string,
      email: newStudent.get("email") as string,
      password: newStudent.get("password") as string,
    },
    section_promo: newStudent.get("section_promo") as string,
  };

  return studentApiResource.createAction(
    prevState,
    data,
    createStudentSchema,
    false,
    ["/admin/students"] // Path to revalidate
  );
};

export const editStudent = async (
  prevState: State,
  updatedStudent: FormData
) => {
  const id = updatedStudent.get("id") as string;
  const data = {
    id,
    user: {
      firstName: updatedStudent.get("firstName") as string,
      lastName: updatedStudent.get("lastName") as string,
      email: updatedStudent.get("email") as string,
    },
    section_promo: updatedStudent.get("section_promo") as string,
  };

  return studentApiResource.updateAction(
    prevState,
    data,
    updateStudentSchema,
    false,
    ["/admin/students", `/admin/students/${id}`]
  );
};

export const deleteStudent = async (prevState: State, formData: FormData) => {
  await studentApiResource.deleteAction(
    prevState,
    formData,
    deleteStudentSchema,
    ["/admin/students"]
  );
  redirect("/admin/students");
};

