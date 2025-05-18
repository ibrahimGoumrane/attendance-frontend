"use server";

import Main from "@/components/admin/teachers/get";
import { getAllDepartments } from "@/lib/services/departments";
import {
  getTeacher,
  getTeacherAttendance,
  getTeacherSubjects,
} from "@/lib/services/teachers";

export default async function TeacherDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [teacher, departments, attendances, subjects] = await Promise.all([
    getTeacher(id),
    getAllDepartments(),
    getTeacherAttendance(id),
    getTeacherSubjects(id),
  ]);
  if (!teacher) {
    return <div>Teacher not found</div>;
  }
  const department = departments.find(
    (department) => +department.id === +teacher.department
  );
  if (!department) {
    return <div>Department not found</div>;
  }
  return (
    <Main
      id={id}
      teacher={teacher}
      department={department}
      departments={departments}
      attendances={attendances}
      subjects={subjects}
    />
  );
}
