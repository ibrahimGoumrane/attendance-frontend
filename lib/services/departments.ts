import { createApiResource } from "./base";
import {
  CreateDepartment,
  Department,
  UpdateDepartment,
} from "../types/department";
import { Teacher } from "../types/teacher";

export const departmentApiResource = createApiResource<
  Department,
  CreateDepartment,
  UpdateDepartment
>("departments");
export const getAllDepartments = departmentApiResource.list;
export const getDepartment = departmentApiResource.get;
export const addDepartment = departmentApiResource.create;
export const editDepartment = departmentApiResource.update;
export const deleteDepartment = departmentApiResource.delete;
export const getDepartmentTeachers = async (id: string) => {
  return departmentApiResource.getAllResource<Teacher[]>(`/${id}/teachers`);
};
export const getAllDepartmentsWithTeacherCount = async () => {
  return departmentApiResource.getAllResource<Department[]>(
    `/with-teacher-count`
  );
};
