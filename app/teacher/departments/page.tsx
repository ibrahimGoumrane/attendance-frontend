"use server";

import DepartmentList from "@/components/teacher/departments/list";
import { getAllDepartments } from "@/lib/services/departments";

export default async function DepartmentPage() {
  const departments = await getAllDepartments();
  return <DepartmentList departments={departments} />;
}
