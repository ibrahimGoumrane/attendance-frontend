"use server";

import StudentMain from "@/components/teacher/students/get";
import { getClass } from "@/lib/services/classes";
import { getStudent, getStudentAttendances, getStudentSubjects } from "@/lib/services/students";

export default async function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [studentData, studentSubjects, attendances] = await Promise.all([
    getStudent(id),
    getStudentSubjects(id),
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
      student={studentData}
      studentSubjects={studentSubjects}
      classData={classData}
      attendances={attendances}
    />
  );
}
