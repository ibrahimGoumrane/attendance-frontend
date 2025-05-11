"use server";

import ListTeachers from "@/components/admin/teachers/list";
import { getAllDepartments } from "@/lib/services/departments";
import { getAllTeachers } from "@/lib/services/teachers";

export default async function TeachersPage() {
  const initialTeachers = await getAllTeachers();
  const initialDepartments = await getAllDepartments();
  return (
    <ListTeachers teachers={initialTeachers} departments={initialDepartments} />
  );
}
