"use server";
import Main from "@/components/teacher/departments/get";
import {
  getDepartment,
  getDepartmentTeachers,
} from "@/lib/services/departments";

export default async function ClassDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const departmentData = await getDepartment(id);
  const teachers = await getDepartmentTeachers(id);
  if (!departmentData) {
    return <div>Department not found</div>;
  }
  return <Main department={departmentData} teachers={teachers} />;
}
