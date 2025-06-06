"use client";

import { ArrowLeft, Edit, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Class } from "@/lib/types/class";
import { Student } from "@/lib/types/student";
import { Attendance } from "@/lib/types/attendance";
import { AttendanceHistory } from "../attendance-history";
import { Subject } from "@/lib/types/subject";

interface MainProps {
  classData: Class;
  students: Student[];
  attendances: Attendance[];
  subjects: Subject[];
}

export default function Main({
  classData,
  students,
  attendances,
  subjects,
}: MainProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const handleEditClick = (cls: Class) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedClass(cls);
  };
  const handleDeleteClick = (cls: Class) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedClass(cls);
  };
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
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {classData.name}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              {classData.studentCount} students enrolled
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => handleEditClick(classData)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteClick(classData)}
            className=""
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Class Information</CardTitle>
            <CardDescription>Details about this class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {classData.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {classData.studentCount} students enrolled
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-md border dark:border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="font-medium">
                        Subject Name
                      </TableHead>
                      <TableHead className="font-medium">Teacher</TableHead>
                      <TableHead className="font-medium">Promo</TableHead>
                      <TableHead className="font-medium">Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject) => (
                      <TableRow
                        key={subject.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <TableCell className="font-medium dark:text-white">
                          {subject.name}
                        </TableCell>
                        <TableCell className="dark:text-gray-300">
                          {subject.teacher.user.firstName}{" "}
                          {subject.teacher.user.lastName}
                        </TableCell>
                        <TableCell className="dark:text-gray-300">
                          {subject.section_promo.name}
                        </TableCell>
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

        <div className="md:col-span-2 flex flex-col">
          <Tabs defaultValue="students" className="flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="students" className="flex-1 flex flex-col">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Enrolled Students</CardTitle>
                  <CardDescription>Students taking this class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border dark:border-gray-800">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableHead className="font-medium">
                            first Name
                          </TableHead>
                          <TableHead className="font-medium">
                            last Name
                          </TableHead>
                          <TableHead className="font-medium">Email</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow
                            key={student.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-900"
                          >
                            <TableCell className="font-medium dark:text-white">
                              {student.user.firstName}
                            </TableCell>
                            <TableCell className="font-medium dark:text-white">
                              {student.user.lastName}
                            </TableCell>
                            <TableCell className="dark:text-gray-300">
                              {student.user.email}
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/teacher/students/${student.id}`}>
                                  View
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance">
              <AttendanceHistory
                attendances={attendances}
                subjects={subjects}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
