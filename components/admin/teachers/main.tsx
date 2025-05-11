"use client";
import { ArrowLeft, Edit, Mail, Trash2, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";
interface MainProps {
  id: string;
}

const Main = ({ id }: MainProps) => {
  const { items: teachers } = useTeacherContext();
  const { items: departments } = useDepartmentContext();
  const department = departments.find((d) => +d.id === +id);
  const teacher = teachers.find((t) => +t.id === +id);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return (
    <div className="space-y-6">
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
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/teachers/${id}/edit`}>
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
                  teacher account and remove their data from our servers.
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

        <div className="md:col-span-2">
          <Tabs defaultValue="classes">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="classes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Classes</CardTitle>
                  <CardDescription>
                    Classes taught by this teacher
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border dark:border-gray-800">
                    <table className="w-full">
                      {/* <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Class Name
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Students
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium w-[100px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-800">
                        {teacher.classes.map((cls) => (
                          <tr
                            key={cls.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-900"
                          >
                            <td className="py-3 px-4 text-sm font-medium dark:text-white">
                              <Link
                                href={`/admin/classes/${cls.id}`}
                                className="hover:underline"
                              >
                                {cls.name}
                              </Link>
                            </td>
                            <td className="py-3 px-4 text-sm dark:text-gray-300">
                              {cls.students}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/classes/${cls.id}`}>
                                  View
                                </Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody> */}
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>
                    Teacher&apos;s attendance history
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">
                      Attendance data visualization
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Detailed attendance records will be displayed here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Main;
