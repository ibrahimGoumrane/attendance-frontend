import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AttendanceTableSkeleton } from "@/components/admin/attendances/attendance-table-skeleton";
import { getAllAttendances } from "@/lib/services/attendances";
import { getAllSubjects } from "@/lib/services/subject";
import { ListAttendances } from "@/components/admin/attendances/list";

export const metadata = {
  title: "Attendance | Admin Dashboard",
  description: "Manage attendance records for students",
};

export default async function AttendancePage() {
  const attendances = await getAllAttendances();
  const subjects = await getAllSubjects();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track and manage student attendance records
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/attendance/create">
            <Plus className="mr-2 h-4 w-4" />
            Record Attendance
          </Link>
        </Button>
      </div>
      <Suspense fallback={<AttendanceTableSkeleton />}>
        <ListAttendances attendances={attendances} subjects={subjects} />
      </Suspense>
    </div>
  );
}
