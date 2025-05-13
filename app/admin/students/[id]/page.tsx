"use server";

import StudentMain from "@/components/admin/students/get";
import { getAllClasses } from "@/lib/services/classes";
import { getStudent } from "@/lib/services/students";

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studentData = await getStudent(id);
  const classes = await getAllClasses();

  if (!studentData) {
    return <div>Student not found</div>;
  }

  return <StudentMain classes={classes} student={studentData} />;
}
