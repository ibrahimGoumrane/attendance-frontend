"use server";

import { State } from "../schemas/base";
import { createStudentSchema } from "../schemas/students";
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

