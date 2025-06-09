"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SubjectAttendance } from "@/lib/types/subject";
import { Clock, Users, UserX, ViewIcon } from "lucide-react";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface TeacherSubjectAttendanceMonitorProps {
  subjectsAttendance: SubjectAttendance[];
}

export function TeacherSubjectAttendanceMonitor({ subjectsAttendance }: TeacherSubjectAttendanceMonitorProps) {
  if (!subjectsAttendance || subjectsAttendance.length === 0) {
    return (
      <div className="text-center text-muted-foreground min-h-[300px] flex flex-col items-center justify-center">
        <BookOpen className="h-12 w-12 mb-4 text-muted-foreground/50" />
        <p className="text-lg font-medium">No subjects assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {subjectsAttendance.map((subjectAttendance, index) => {
        const totalStudents = subjectAttendance.presentStudents + subjectAttendance.absentStudents.length;
        const attendanceRate = totalStudents > 0 ? (subjectAttendance.presentStudents / totalStudents) * 100 : 0;

        // Determine class status
        const now = new Date();
        const classDate = new Date(subjectAttendance.date);
        const classEndDate = new Date(classDate.getTime() + 2 * 60 * 60 * 1000);

        let status: "ongoing" | "upcoming" | "ended";
        if (now.getTime() > classEndDate.getTime()) {
          status = "ended";
        } else if (now.getTime() >= classDate.getTime() && now.getTime() <= classEndDate.getTime()) {
          status = "ongoing";
        } else {
          status = "upcoming";
        }

        const statusColor = status === "ongoing" ? "secondary" : status === "upcoming" ? "default" : "destructive";

        const formattedTime = new Date(subjectAttendance.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        return (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{subjectAttendance.subject.name}</h3>
                  <Badge variant={statusColor}>{status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {subjectAttendance.subject.section_promo.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formattedTime}
                  </span>
                </div>
              </div>
              <Link href={`/teacher/subjects/${subjectAttendance.subject.id}`}>
                <Button variant="outline" size="sm">
                  <ViewIcon className="h-4 w-4 mr-2" />
                  View Subject Details
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className="text-sm font-bold">{attendanceRate.toFixed(1)}%</span>
                </div>
                <Progress value={attendanceRate} className="h-2" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Present:</span>
                    <span className="font-medium text-green-600">{subjectAttendance.presentStudents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Absent:</span>
                    <span className="font-medium text-red-600">{subjectAttendance.absentStudents.length}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Absent Students</span>
                </div>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {subjectAttendance.absentStudents.length > 0 ? (
                    subjectAttendance.absentStudents.map((student, index) => (
                      <div key={index} className="flex items-center justify-between text-xs bg-muted/50 rounded p-2">
                        <span className="font-medium">
                          {student.user.firstName} {student.user.lastName}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground italic p-2">All students present</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
