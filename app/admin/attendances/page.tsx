import { Suspense } from "react";
import { AttendanceTableSkeleton } from "@/components/admin/attendances/attendance-table-skeleton";
import { getAllAttendances } from "@/lib/services/attendances";
import { getAllSubjects } from "@/lib/services/subject";
import { getAllStudents } from "@/lib/services/students";
import { ListAttendances } from "@/components/admin/attendances/list";

export const metadata = {
  title: "Attendance | Admin Dashboard",
  description: "Manage attendance records for students",
};

export default async function AttendancePage() {
  const attendances = await getAllAttendances();
  const subjects = await getAllSubjects();
  const students = await getAllStudents();

  return (
    <div className="flex flex-col gap-6 flex-1">
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <ListAttendances
          attendances={attendances}
          subjects={subjects}
          students={students}
        />
      </Suspense>
    </div>
  );
}
