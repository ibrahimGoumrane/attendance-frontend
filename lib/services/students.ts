import { createApiResource } from "./base";
import { CreateStudent, Student, UpdateStudent } from "../types/student";
import { StudentImage } from "../types/user";

export const studentApiResource = createApiResource<
  Student,
  CreateStudent,
  UpdateStudent
>("students");
export const getAllStudents = () => studentApiResource.list();
export const getStudent = (id: string) => studentApiResource.get(id);
export const addStudent = (data: CreateStudent) => studentApiResource.create(data);
export const editStudent = (id: string, data: UpdateStudent) => studentApiResource.update(id, data);
export const deleteStudent = (id: string) => studentApiResource.delete(id);

// Source for student images
const studentImageApiResource = createApiResource<StudentImage>("images");
export const getStudentImages = (id: string) => studentImageApiResource.get(id);
export const addStudentImage = (data: StudentImage) => studentImageApiResource.create(data);