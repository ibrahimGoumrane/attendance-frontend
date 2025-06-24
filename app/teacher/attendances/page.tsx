import { Suspense } from "react";
import { AttendanceTableSkeleton } from "@/components/teacher/attendances/attendance-table-skeleton";
import { getAllStudents } from "@/lib/services/students";
import { getTeacherAttendance, getTeacherSubjects } from "@/lib/services/teachers";
import { getLoggedInTeacher } from "@/lib/services/users";
import { AttendanceManagement } from "@/components/teacher/attendances/attendance-management";

export const metadata = {
  title: "Attendance | Teacher Dashboard",
  description: "Manage attendance records for students",
};

export default async function AttendancePage() {
  const loggedInTeacher = await getLoggedInTeacher();
  if (!loggedInTeacher) {
    return <div>Please log in to view your subjects.</div>;
  }

  const subjects = await getTeacherSubjects(loggedInTeacher.id);
  if (subjects.length === 0) {
    return <div>You have no subjects assigned.</div>;
  }

  const attendances = await getTeacherAttendance(loggedInTeacher.id);
  if (attendances.length === 0) {
    return <div>No attendance records found for your subjects.</div>;
  }

  const students = await getAllStudents();

  return (
    <div className="flex flex-col gap-6 flex-1">
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <AttendanceManagement subjects={subjects} attendances={attendances} students={students} />
      </Suspense>
    </div>
  );
}
