import { createApiResource } from "./base";
import {
  CreateDepartment,
  Department,
  DepartmentAttendance,
  UpdateDepartment,
} from "../types/department";
import { Teacher } from "../types/teacher";

export const departmentApiResource = createApiResource<
  Department,
  CreateDepartment,
  UpdateDepartment
>("departments");

// Change direct method references to arrow functions
export const getAllDepartments = () => departmentApiResource.list();
export const getDepartment = (id: string) => departmentApiResource.get(id);
export const addDepartment = (data: CreateDepartment) =>
  departmentApiResource.create(data);
export const editDepartment = (id: string, data: UpdateDepartment) =>
  departmentApiResource.update(id, data);
export const deleteDepartment = (id: string) =>
  departmentApiResource.delete(id);

// These are already using arrow functions, so they're fine
export const getDepartmentTeachers = async (id: string) => {
  return departmentApiResource.getAllResource<Teacher>(`/${id}/teachers`);
};
export const getDepartmentsAttendances = async () =>
  departmentApiResource.getAllResource<DepartmentAttendance>(
    "attendance-total"
  );
