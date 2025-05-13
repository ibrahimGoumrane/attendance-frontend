"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Link, Trash2 } from "lucide-react";
import { useState } from "react";
import { Student } from "@/lib/types/student";
import DeleteStudent from "./delete";
import UpdateStudentForm from "./edit";
import { Class } from "@/lib/types/class";

interface MainProps {
  student: Student;
  classes: Class[];
}

export default function Main({ student, classes }: MainProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const handleEditClick = (student: Student) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedStudent(student);
  };
  const handleDeleteClick = (student: Student) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedStudent(student);
  };
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
              {student.user.firstName + " " + student.user.lastName}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Student Information
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => handleEditClick(student)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteClick(student)}
            className=""
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/students">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Class {student.class}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/students/${params.id}/edit`}>
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
                <GraduationCap className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Class {student.class}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Age</p>
                <p className="text-sm text-muted-foreground">
                  {student.age} years
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-300">
                    Email
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium dark:text-gray-300">
                    Phone
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.phone}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Address
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.address}
                </p>
              </div>
              <div className="pt-4 border-t dark:border-gray-800">
                <p className="text-sm font-medium dark:text-gray-300">
                  Department
                </p>
                <p className="text-sm text-muted-foreground">
                  <Link
                    href={`/admin/departments/${student.departmentId}`}
                    className="hover:underline"
                  >
                    {student.department}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">
                  Enrolled
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(student.enrollmentDate).toLocaleDateString(
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
                  Attendance
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.attendance}
                </p>
              </div>
              <div className="pt-4 border-t dark:border-gray-800">
                <p className="text-sm font-medium dark:text-gray-300">
                  Parent/Guardian
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.parentName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.parentEmail}
                </p>
                <p className="text-sm text-muted-foreground">
                  {student.parentPhone}
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
                  <div className="rounded-md border dark:border-gray-800">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Course Name
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Teacher
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium">
                            Grade
                          </th>
                          <th className="py-3 px-4 text-left text-sm font-medium w-[100px]">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-gray-800">
                        {student.courses.map((course) => (
                          <tr
                            key={course.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-900"
                          >
                            <td className="py-3 px-4 text-sm font-medium dark:text-white">
                              <Link
                                href={`/admin/classes/${course.id}`}
                                className="hover:underline"
                              >
                                {course.name}
                              </Link>
                            </td>
                            <td className="py-3 px-4 text-sm dark:text-gray-300">
                              {course.teacher}
                            </td>
                            <td className="py-3 px-4 text-sm dark:text-gray-300">
                              {course.grade}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/classes/${course.id}`}>
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
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>
                    Student&apos;s attendance history
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
      </div> */}
      </div>

      {selectedStudent && (
        <>
          <UpdateStudentForm
            studentData={selectedStudent}
            open={editModalOpen}
            classes={classes}
            setIsOpen={setEditModalOpen}
          />
          <DeleteStudent
            id={selectedStudent.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
}
