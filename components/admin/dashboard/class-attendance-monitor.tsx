"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Eye, Users, UserX } from "lucide-react";
import { SubjectAttendance } from "@/lib/types/subject";
import { formatDatetimeLocal } from "@/lib/utils";

interface SubjectAttendanceProps {
  subjectsAttendance: SubjectAttendance[];
}

export function SubjectAttendanceMonitor({
  subjectsAttendance,
}: SubjectAttendanceProps) {
  if (!subjectsAttendance || subjectsAttendance.length === 0) {
    return (
      <div className="text-center text-muted-foreground min-h-[300px] flex items-center justify-center">
        No classes today
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {subjectsAttendance.map((classItem) => {
        const attendanceRate =
          (classItem.presentStudents /
            (classItem.presentStudents + classItem.absentStudents.length)) *
          100;

        // Determine class status based on current time and class date
        const now = new Date();
        const classDate = new Date(formatDatetimeLocal(classItem.date));
        const classEndDate = new Date(classDate.getTime() + 2 * 60 * 60 * 1000);

        let status: "ongoing" | "upcoming" | "ended";

        if (now.getTime() > classEndDate.getTime()) {
          status = "ended";
        } else if (
          now.getTime() >= classDate.getTime() &&
          now.getTime() <= classEndDate.getTime()
        ) {
          status = "ongoing";
        } else {
          status = "upcoming";
        }

        const statusColor =
          status === "ongoing"
            ? "secondary"
            : status === "upcoming"
            ? "default"
            : "destructive";

        // Format the time in a consistent way that won't change between server and client
        const formattedTime = new Date(
          formatDatetimeLocal(classItem.date)
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Use 24-hour format
        });

        return (
          <div
            key={classItem.subject.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">
                    {classItem.subject.name}
                  </h3>
                  <Badge variant={statusColor}>{status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {classItem.subject.teacher.user.firstName}{" "}
                    {classItem.subject.teacher.user.lastName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formattedTime}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className="text-sm font-bold">
                    {attendanceRate.toFixed(1)}%
                  </span>
                </div>
                <Progress value={attendanceRate} className="h-2" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Present:</span>
                    <span className="font-medium text-green-600">
                      {classItem.presentStudents}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Absent:</span>
                    <span className="font-medium text-red-600">
                      {classItem.absentStudents.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Absent Students</span>
                </div>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {classItem.absentStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs bg-muted/50 rounded p-2"
                    >
                      <span className="font-medium">
                        {student.user.firstName + " " + student.user.lastName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
