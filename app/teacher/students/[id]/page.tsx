"use server";

import StudentMain from "@/components/teacher/students/get";
import { getAllClasses, getClass } from "@/lib/services/classes";
import { getStudent, getStudentAttendances } from "@/lib/services/students";

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [studentData, classes, attendances] = await Promise.all([
    getStudent(id),
    getAllClasses(),
    getStudentAttendances(id),
  ]);

  if (!studentData) {
    return <div>Student not found </div>;
  }

  const classData = await getClass(studentData?.section_promo);

  if (!classData) {
    return <div>Class not found </div>;
  }

  return (
    <StudentMain
      classes={classes}
      student={studentData}
      classData={classData}
      attendances={attendances}
    />
  );
}
