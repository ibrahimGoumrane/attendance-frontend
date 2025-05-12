"use server";
import { State } from "../schemas/base";
import {
  CreateTeacherSchema,
  DeleteTeacherSchema,
  UpdateTeacherSchema,
} from "../schemas/teachers";
import { teacherApiResource } from "../services/teachers";

export const addTeacher = async (prevState: State, newTeacher: FormData) => {
  const data = {
    user: {
      firstName: newTeacher.get("firstName") as string,
      lastName: newTeacher.get("lastName") as string,
      email: newTeacher.get("email") as string,
      password: newTeacher.get("password") as string,
    },
    department: newTeacher.get("department") as string,
  };

  return teacherApiResource.createAction(
    prevState,
    data,
    CreateTeacherSchema,
    false,
    ["/admin/teachers"] // Path to revalidate
  );
};
export const editTeacher = async (
  prevState: State,
  updatedTeacher: FormData
) => {
  const id = updatedTeacher.get("id") as string;
  const data = {
    id,
    user: {
      firstName: updatedTeacher.get("firstName") as string,
      lastName: updatedTeacher.get("lastName") as string,
      email: updatedTeacher.get("email") as string,
    },
    department: updatedTeacher.get("department") as string,
  };

  return teacherApiResource.updateAction(
    prevState,
    data,
    UpdateTeacherSchema,
    false,
    ["/admin/teachers", `/admin/teachers/${id}`] // Multiple paths to revalidate
  );
};
export const deleteTeacher = async (prevState: State, formData: FormData) => {
  return teacherApiResource.deleteAction(
    prevState,
    formData,
    DeleteTeacherSchema,
    ["/admin/teachers"]
  );
};
