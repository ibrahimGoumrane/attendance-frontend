import { createApiResource } from "./base";
import { CreateStudent, Student, UpdateStudent } from "../types/student";
import { StudentImage } from "../types/user";

const studentApiResource = createApiResource<
  Student,
  CreateStudent,
  UpdateStudent
>("students");
export const getAllStudents = studentApiResource.list;
export const getStudent = studentApiResource.get;
export const addStudent = studentApiResource.create;
export const editStudent = studentApiResource.update;
export const deleteStudent = studentApiResource.delete;

// Resource for student images
const studentImageApiResource = createApiResource<StudentImage>("images");
export const getStudentImages = studentImageApiResource.get;
export const addStudentImage = studentImageApiResource.create;
