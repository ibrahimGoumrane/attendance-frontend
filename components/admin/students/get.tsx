"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Edit, GraduationCap, Mail, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Student } from "@/lib/types/student";
import type { Class } from "@/lib/types/class";
import type { Attendance } from "@/lib/types/attendance";
import { Badge } from "@/components/ui/badge";

interface MainProps {
  student: Student;
  classes: Class[];
  classData: Class;
  attendances: Attendance[];
}

export default function StudentDetailsPage({
  student,
  // classes,
  classData,
  attendances,
}: MainProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Calculate attendance statistics
  const totalAttendances = attendances.length;
  const presentCount = attendances.filter((a) => a.status === "present").length;
  const attendanceRate =
    totalAttendances > 0
      ? Math.round((presentCount / totalAttendances) * 100)
      : 0;

  // Group attendances by subject
  const subjectAttendances = attendances.reduce((acc, attendance) => {
    const subjectId = attendance.subject.id;
    if (!acc[subjectId]) {
      acc[subjectId] = {
        subject: attendance.subject,
        records: [],
      };
    }
    acc[subjectId].records.push(attendance);
    return acc;
  }, {} as Record<string, { subject: Attendance["subject"]; records: Attendance[] }>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/students">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {student.user.firstName} {student.user.lastName}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Class : {classData.name} Has {classData.studentCount} students
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/students/${student.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  student account and remove their data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Personal and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                {/* {student.user.latest_image ? (
                  <Image
                    src={student.user.latest_image.url || "/placeholder.svg"}
                    alt={`${student.user.firstName} ${student.user.lastName}`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : ( */}
                <GraduationCap className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                {/* )} */}
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {student.user.firstName} {student.user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Class {student.section_promo} / {classData.name} Has{" "}
                {classData.studentCount} students
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-300">
                    Email
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.user.email}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Role</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {student.user.role}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Joined</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(student.user.created_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Last Updated
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(student.user.updated_at).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Attendance Rate
                </p>
                <p className="text-sm text-muted-foreground">
                  {attendanceRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="courses">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="courses" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>
                    Courses taken by this student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {Object.values(subjectAttendances).length > 0 ? (
                    <div className="rounded-md border dark:border-gray-800">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <th className="py-3 px-4 text-left text-sm font-medium">
                              Subject Name
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium">
                              Teacher
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium">
                              Class
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium w-[100px]">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-800">
                          {Object.values(subjectAttendances).map(
                            ({ subject }) => (
                              <tr
                                key={subject.id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-900"
                              >
                                <td className="py-3 px-4 text-sm font-medium dark:text-white">
                                  <Link
                                    href={`/admin/subjects/${subject.id}`}
                                    className="hover:underline"
                                  >
                                    {subject.name}
                                  </Link>
                                </td>
                                <td className="py-3 px-4 text-sm dark:text-gray-300">
                                  <Link
                                    href={`/admin/teachers/${subject.teacher.id}`}
                                    className="hover:underline"
                                  >
                                    {subject.teacher.user.firstName}{" "}
                                    {subject.teacher.user.lastName}
                                  </Link>
                                </td>
                                <td className="py-3 px-4 text-sm dark:text-gray-300">
                                  {subject.section_promo.name}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link
                                      href={`/admin/subjects/${subject.id}`}
                                    >
                                      View
                                    </Link>
                                  </Button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No courses found for this student
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Attendance Records</CardTitle>
                    <CardDescription>
                      Student&apos;s attendance history
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-xs text-muted-foreground">
                        Present
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-xs text-muted-foreground">
                        Absent
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {attendances.length > 0 ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {totalAttendances}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Total Records
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {attendanceRate}%
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Attendance Rate
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {Object.keys(subjectAttendances).length}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Subjects
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="rounded-md border dark:border-gray-800">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800">
                              <th className="py-3 px-4 text-left text-sm font-medium">
                                Date
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-medium">
                                Subject
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-medium">
                                Teacher
                              </th>
                              <th className="py-3 px-4 text-left text-sm font-medium">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y dark:divide-gray-800">
                            {attendances
                              .sort(
                                (a, b) =>
                                  new Date(b.date).getTime() -
                                  new Date(a.date).getTime()
                              )
                              .map((attendance) => (
                                <tr
                                  key={attendance.id}
                                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                                >
                                  <td className="py-3 px-4 text-sm font-medium dark:text-white">
                                    {new Date(
                                      attendance.date
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </td>
                                  <td className="py-3 px-4 text-sm dark:text-gray-300">
                                    <Link
                                      href={`/admin/subjects/${attendance.subject.id}`}
                                      className="hover:underline"
                                    >
                                      {attendance.subject.name}
                                    </Link>
                                  </td>
                                  <td className="py-3 px-4 text-sm dark:text-gray-300">
                                    <Link
                                      href={`/admin/teachers/${attendance.subject.teacher.id}`}
                                      className="hover:underline"
                                    >
                                      {
                                        attendance.subject.teacher.user
                                          .firstName
                                      }{" "}
                                      {attendance.subject.teacher.user.lastName}
                                    </Link>
                                  </td>
                                  <td className="py-3 px-4 text-sm">
                                    <Badge
                                      variant={
                                        attendance.status === "present"
                                          ? "default"
                                          : "destructive"
                                      }
                                      className={`${
                                        attendance.status === "present"
                                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                                          : "bg-red-100 text-red-800 hover:bg-red-100"
                                      }`}
                                    >
                                      {attendance.status === "present"
                                        ? "Present"
                                        : "Absent"}
                                    </Badge>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <p className="text-muted-foreground mb-2">
                        No attendance records found
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Attendance records will appear here once they are
                        recorded
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
