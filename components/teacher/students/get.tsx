"use client";

import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Student } from "@/lib/types/student";
import type { Subject } from "@/lib/types/subject";
import type { Class } from "@/lib/types/class";
import type { Attendance } from "@/lib/types/attendance";
import { AttendanceHistory } from "../attendance-history";

interface MainProps {
  student: Student;
  studentSubjects: Subject[];
  classData: Class;
  attendances: Attendance[];
}

export default function StudentDetailsPage({ student, studentSubjects, classData, attendances }: MainProps) {
  // Calculate attendance statistics
  const totalAttendances = attendances.length;
  const presentCount = attendances.filter(a => a.status === "present").length;
  const attendanceRate = totalAttendances > 0 ? Math.round((presentCount / totalAttendances) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teacher/students">
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
                <GraduationCap className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {student.user.firstName} {student.user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Class {student.section_promo} / {classData.name} Has {classData.studentCount} students
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Email</p>
                <p className="text-sm text-muted-foreground">{student.user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Role</p>
                <p className="text-sm text-muted-foreground capitalize">{student.user.role}</p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Joined</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(student.user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(student.user.updated_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Attendance Rate</p>
                <p className="text-sm text-muted-foreground">{attendanceRate}%</p>
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
                  <CardDescription>Courses taken by this student</CardDescription>
                </CardHeader>
                <CardContent>
                  {studentSubjects.length > 0 ? (
                    <div className="rounded-md border dark:border-gray-800">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800">
                            <th className="py-3 px-4 text-left text-sm font-medium">Subject Name</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Teacher</th>
                            <th className="py-3 px-4 text-left text-sm font-medium">Class</th>
                            <th className="py-3 px-4 text-left text-sm font-medium w-[100px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y dark:divide-gray-800">
                          {studentSubjects.map(subject => (
                            <tr key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                              <td className="py-3 px-4 text-sm font-medium dark:text-white">
                                <Link href={`/teacher/subjects/${subject.id}`} className="hover:underline">
                                  {subject.name}
                                </Link>
                              </td>
                              <td className="py-3 px-4 text-sm dark:text-gray-300">
                                <Link href={`/teacher/teachers/${subject.teacher.id}`} className="hover:underline">
                                  {subject.teacher.user.firstName} {subject.teacher.user.lastName}
                                </Link>
                              </td>
                              <td className="py-3 px-4 text-sm dark:text-gray-300">{subject.section_promo.name}</td>
                              <td className="py-3 px-4 text-sm">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/teacher/subjects/${subject.id}`}>View</Link>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No courses found for this student</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <AttendanceHistory attendances={attendances} subjects={studentSubjects} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
