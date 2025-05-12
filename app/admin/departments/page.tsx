"use server"

import DepartmentList from "@/components/admin/departments/list";
import { getAllDepartmentsWithTeacherCount } from "@/lib/services/departments"

export default async function DepartmentPage() {
  const departments = await getAllDepartmentsWithTeacherCount();
  return <DepartmentList departments={departments}/>
}
