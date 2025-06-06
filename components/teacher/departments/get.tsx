"use client";

import { ArrowLeft, Building2, Edit, Trash2 } from "lucide-react";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { Department } from "@/lib/types/department";
import type { Teacher } from "@/lib/types/teacher";

interface MainProps {
  department: Department;
  teachers: Teacher[];
}

export default function Main({ department, teachers }: MainProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Filter teachers and classes for this department
  const departmentTeachers = teachers.filter(
    (teacher) => teacher.department === department.id
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/teacher/departments">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {department.name}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Department Information
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
            <CardTitle>Department Information</CardTitle>
            <CardDescription>Details about this department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {department.name}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Description
                </p>
                <p className="text-sm text-muted-foreground">
                  {department.description || "No description available"}
                </p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium dark:text-gray-300">
                    Teachers
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {department.teacherCount || departmentTeachers.length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="teachers" className="w-full">
            <TabsContent value="teachers" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Department Teachers</CardTitle>
                    <CardDescription>
                      Teachers in this department
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border dark:border-gray-800">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableHead className="font-medium">Name</TableHead>
                          <TableHead className="font-medium">Email</TableHead>
                          <TableHead className="font-medium">Role</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {departmentTeachers.length > 0 ? (
                          departmentTeachers.map((teacher) => (
                            <TableRow
                              key={teacher.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-900"
                            >
                              <TableCell className="font-medium dark:text-white">
                                <Link
                                  href={`/teacher/teachers/${teacher.id}`}
                                  className="hover:underline"
                                >
                                  {teacher.user.firstName}{" "}
                                  {teacher.user.lastName}
                                </Link>
                              </TableCell>
                              <TableCell className="dark:text-gray-300">
                                {teacher.user.email}
                              </TableCell>
                              <TableCell className="dark:text-gray-300">
                                {teacher.user.role}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" asChild>
                                  <Link href={`/teacher/teachers/${teacher.id}`}>
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center py-4 text-muted-foreground"
                            >
                              No teachers in this department
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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
