"use client";

import { ArrowLeft, Users, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Class } from "@/lib/types/class";
import { Student } from "@/lib/types/student";
import { Attendance } from "@/lib/types/attendance";
import { AttendanceHistory } from "../attendance-history";
import { Subject } from "@/lib/types/subject";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainProps {
  classData: Class;
  students: Student[];
  attendances: Attendance[];
  subjects: Subject[];
}

export default function Main({ classData, students, attendances, subjects }: MainProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const paginatedStudents = students.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teacher/classes">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">{classData.name}</h1>
            <p className="text-muted-foreground dark:text-gray-400">{classData.studentCount} students enrolled</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
            <CardDescription>Details about this class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">{classData.name}</h3>
              <p className="text-sm text-muted-foreground">{classData.studentCount} students enrolled</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-md border dark:border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="font-medium">Subject Name</TableHead>
                      <TableHead className="font-medium">Teacher</TableHead>
                      <TableHead className="font-medium">Promo</TableHead>
                      <TableHead className="font-medium">Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map(subject => (
                      <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                        <TableCell className="font-medium dark:text-white">{subject.name}</TableCell>
                        <TableCell className="dark:text-gray-300">
                          {subject.teacher.user.firstName} {subject.teacher.user.lastName}
                        </TableCell>
                        <TableCell className="dark:text-gray-300">{subject.section_promo.name}</TableCell>
                        <TableCell className="dark:text-gray-300">
                          {subject.section_promo.studentCount || "Not Assigned"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="students" className="flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="flex-1 flex flex-col">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Enrolled Students</CardTitle>
                  <CardDescription>Students enrolled in this class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border dark:border-gray-800">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableHead className="font-medium">First Name</TableHead>
                          <TableHead className="font-medium">Last Name</TableHead>
                          <TableHead className="font-medium">Email</TableHead>
                          <TableHead className="font-medium"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedStudents.length > 0 ? (
                          paginatedStudents.map(student => (
                            <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                              <TableCell className="font-medium dark:text-white">{student.user.firstName}</TableCell>
                              <TableCell className="font-medium dark:text-white">{student.user.lastName}</TableCell>
                              <TableCell className="dark:text-gray-300">{student.user.email}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                      <Link
                                        href={`/teacher/students/${student.id}`}
                                        className="flex items-center justify-start"
                                      >
                                        View Details
                                      </Link>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="h-24 text-center">
                              No students found.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-0 sm:mt-4">
                      <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(currentPage * itemsPerPage, students.length)} of {students.length} students
                      </div>
                      <div className="flex items-center justify-center sm:justify-end space-x-2 order-1 sm:order-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm">
                          Page {currentPage} of {totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance">
              <AttendanceHistory attendances={attendances} subjects={subjects} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
