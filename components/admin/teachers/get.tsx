"use client";
import { ArrowLeft, Edit, Mail, Trash2, User } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Delete from "./delete";
import UpdateForm from "./edit";

import { useState } from "react";
import { Attendance } from "@/lib/types/attendance";
import { Department } from "@/lib/types/department";
import { Subject } from "@/lib/types/subject";
import { Teacher } from "@/lib/types/teacher";
import { AttendanceHistory } from "./attendance-history";

interface MainProps {
  id: string;
  teacher: Teacher;
  department: Department;
  departments: Department[];
  subjects: Subject[];
  attendances: Attendance[];
}

const Main = ({
  teacher,
  department,
  departments,
  subjects,
  attendances,
}: MainProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const handleEditClick = (teacher: Teacher) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedTeacher(teacher);
  };
  const handleDeleteClick = (teacher: Teacher) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedTeacher(teacher);
  };
  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <div className="space-y-6 flex-1 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/teachers">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {teacher.user.firstName} {teacher.user.lastName}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              {department?.name} Department
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => handleEditClick(teacher)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteClick(teacher)}
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
            <CardTitle>Teacher Information</CardTitle>
            <CardDescription>Personal and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {teacher.user.firstName} {teacher.user.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {department?.name} Department
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
                    {teacher.user.email}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 flex flex-col">
          <Tabs defaultValue="classes">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="classes" className="flex flex-col">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>Assigned Classes</CardTitle>
                  <CardDescription>
                    Classes taught by this teacher
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border dark:border-gray-800 ">
                    <table className="w-full ">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Subject Name
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Class Name
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Students Count
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium w-[100px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-800 ">
                        {subjects.map((subject) => (
                          <tr
                            key={subject.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-900"
                          >
                            <td className="py-3 px-4 text-sm font-medium dark:text-white">
                              {subject.name}
                            </td>
                            <td className="py-3 px-4 text-sm dark:text-gray-300">
                              {subject.section_promo.name}
                            </td>
                            <td className="py-3 px-4 text-sm dark:text-gray-300">
                              {subject.section_promo.studentCount}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/subjects/${subject.id}`}>
                                  View
                                </Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
      {selectedTeacher && (
        <>
          <UpdateForm
            teacher={selectedTeacher}
            departments={departments}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />
          <Delete
            id={selectedTeacher.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
};

export default Main;
