"use server";
import Main from "@/components/teacher/classes/get";
import {
  getClass,
  getClassAttendance,
  getClassStudents,
  getClassSubjects,
} from "@/lib/services/classes";

export default async function ClassDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [classData, students, attendances, subjects] = await Promise.all([
    getClass(id),
    getClassStudents(id),
    getClassAttendance(id),
    getClassSubjects(id),
  ]);
  if (!classData) {
    return <div>Class not found</div>;
  }
  return (
    <Main
      classData={classData}
      students={students}
      attendances={attendances}
      subjects={subjects}
    />
  );
}
