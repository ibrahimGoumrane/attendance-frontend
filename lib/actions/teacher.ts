"use server";
import { State } from "../schemas/base";
import {
  CreateTeacherSchema,
  DeleteTeacherSchema,
  UpdateTeacherSchema,
} from "../schemas/teachers";
import { teacherApiResource } from "../services/teachers";

export const addTeacher = async (prevState: State, newTeacher: FormData) => {
  return teacherApiResource.createAction(
    prevState,
    newTeacher,
    CreateTeacherSchema
  );
};
export const editTeacher = async (prevState: State, formData: FormData) => {
  return teacherApiResource.updateAction(
    prevState,
    formData,
    UpdateTeacherSchema
  );
};
export const deleteTeacher = async (prevState: State, formData: FormData) => {
  return teacherApiResource.deleteAction(
    prevState,
    formData,
    DeleteTeacherSchema
  );
};
