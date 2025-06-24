import { createApiResource } from "./base";
import { CreateStudent, Student, UpdateStudent } from "../types/student";
import { StudentImage } from "../types/user";
import { Attendance } from "../types/attendance";
import { Total } from "../types/base";
import { Subject } from "../types/subject";

export const studentApiResource = createApiResource<
  Student,
  CreateStudent,
  UpdateStudent
>("students");
export const getAllStudents = () => studentApiResource.list();
export const getStudent = (id: string) => studentApiResource.get(id);
export const addStudent = (data: CreateStudent) =>
  studentApiResource.create(data);
export const editStudent = (id: string, data: UpdateStudent) =>
  studentApiResource.update(id, data);
export const deleteStudent = (id: string) => studentApiResource.delete(id);

// Source for student images
export const studentImageApiResource = createApiResource<
  StudentImage,
  FormData,
  FormData
>("images", true);
export const getStudentImages = (id: string) =>
  studentImageApiResource.getAllResource<StudentImage>(`?student_id=${id}`);
export const addStudentImage = (data: FormData) =>
  studentImageApiResource.create(data);

export const getStudentAttendances = async (id: string) => {
  return studentApiResource.getAllResource<Attendance>(`/${id}/attendances/`);
};

export const getStudentSubjects = async (id: string) => {
  return studentApiResource.getAllResource<Subject>(`/${id}/subjects/`);
};

export const getTotalStudents = async () =>
  studentApiResource.getResource<Total>("total");
