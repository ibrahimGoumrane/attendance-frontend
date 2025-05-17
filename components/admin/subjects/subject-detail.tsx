"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookText,
  Edit,
  Trash2,
  Users,
  CalendarCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

import type { Subject } from "@/lib/types/subject";
import type { Attendance } from "@/lib/types/attendance";

interface SubjectDetailProps {
  subject: Subject;
  attendances?: Attendance[];
}

export function SubjectDetail({
  subject,
  attendances = [],
}: SubjectDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Calculate attendance statistics
  const totalAttendances = attendances.length;
  const presentAttendances = attendances.filter(
    (a) => a.status === "present"
  ).length;
  const attendanceRate =
    totalAttendances > 0
      ? Math.round((presentAttendances / totalAttendances) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/subjects">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {subject.name}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              {subject.section_promo.name} • Taught by{" "}
              {subject.teacher.user.firstName} {subject.teacher.user.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setEditModalOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteModalOpen(true)}
            className=""
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
            <CardDescription>Details about this subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <BookText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {subject.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {subject.section_promo.name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Teacher
                </p>
                <p className="text-sm text-muted-foreground">
                  <Link
                    href={`/admin/teachers/${subject.teacher.id}`}
                    className="hover:underline"
                  >
                    {subject.teacher.user.firstName}{" "}
                    {subject.teacher.user.lastName}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Class</p>
                <p className="text-sm text-muted-foreground">
                  <Link
                    href={`/admin/classes/${subject.section_promo.id}`}
                    className="hover:underline"
                  >
                    {subject.section_promo.name}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Students
                </p>
                <p className="text-sm text-muted-foreground">
                  {subject.section_promo.studentCount || 0} students
                </p>
              </div>

              {attendances.length > 0 && (
                <div className="pt-4 border-t dark:border-gray-800">
                  <p className="text-sm font-medium dark:text-gray-300 mb-2">
                    Attendance Rate
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall</span>
                      <span>{attendanceRate}%</span>
                    </div>
                    <Progress value={attendanceRate} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {presentAttendances} present,{" "}
                      {totalAttendances - presentAttendances} absent out of{" "}
                      {totalAttendances} records
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="students">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Enrolled Students</CardTitle>
                    <CardDescription>
                      Students taking this subject
                    </CardDescription>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/admin/classes/${subject.section_promo.id}`}>
                      <Users className="h-4 w-4 mr-2" />
                      View Class
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">Student list</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      The list of students enrolled in this subject will be
                      displayed here.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href={`/admin/classes/${subject.section_promo.id}`}>
                        View Class Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Attendance Records</CardTitle>
                    <CardDescription>
                      Attendance for this subject
                    </CardDescription>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/admin/attendance/create">
                      <CalendarCheck className="h-4 w-4 mr-2" />
                      Record Attendance
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CalendarCheck className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">
                      Attendance records
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Attendance records for this subject will be displayed
                      here.
                    </p>
                    <Button className="mt-4" asChild>
                      <Link href="/admin/attendance">View All Attendance</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
