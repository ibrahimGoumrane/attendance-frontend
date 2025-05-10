"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Building2, Edit, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock department data
const department = {
  id: "1",
  name: "Computer Science",
  description: "Study of computers and computational systems",
  headOfDepartment: "John Smith",
  headOfDepartmentId: "1",
  established: "1985",
  teachers: [
    { id: "1", name: "John Smith", email: "john.smith@facetrack.com", role: "Head of Department" },
    { id: "3", name: "Michael Brown", email: "michael.brown@facetrack.com", role: "Senior Lecturer" },
  ],
  classes: [
    { id: "1", name: "Introduction to Programming", teacher: "John Smith", students: 32 },
    { id: "2", name: "Data Structures", teacher: "John Smith", students: 28 },
    { id: "3", name: "Web Development", teacher: "Michael Brown", students: 24 },
  ],
}

export default function DepartmentDetailsPage({ params }: { params: { id: string } }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/departments">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">{department.name}</h1>
            <p className="text-muted-foreground dark:text-gray-400">Department Information</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/departments/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
                  This action cannot be undone. This will permanently delete the department and remove all associated
                  data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
              <h3 className="text-xl font-semibold dark:text-white">{department.name}</h3>
              <p className="text-sm text-muted-foreground">Established {department.established}</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Head of Department</p>
                <p className="text-sm text-muted-foreground">
                  <Link href={`/admin/teachers/${department.headOfDepartmentId}`} className="hover:underline">
                    {department.headOfDepartment}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm font-medium dark:text-gray-300">Description</p>
                <p className="text-sm text-muted-foreground">{department.description}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium dark:text-gray-300">Teachers</p>
                  <p className="text-sm text-muted-foreground">{department.teachers.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-gray-300">Classes</p>
                  <p className="text-sm text-muted-foreground">{department.classes.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="teachers">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
            </TabsList>
            <TabsContent value="teachers" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Department Teachers</CardTitle>
                    <CardDescription>Teachers in this department</CardDescription>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/admin/teachers/create">
                      <Users className="h-4 w-4 mr-2" />
                      Add Teacher
                    </Link>
                  </Button>
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
                        {department.teachers.map((teacher) => (
                          <TableRow key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            <TableCell className="font-medium dark:text-white">
                              <Link href={`/admin/teachers/${teacher.id}`} className="hover:underline">
                                {teacher.name}
                              </Link>
                            </TableCell>
                            <TableCell className="dark:text-gray-300">{teacher.email}</TableCell>
                            <TableCell className="dark:text-gray-300">{teacher.role}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/teachers/${teacher.id}`}>View</Link>
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
            <TabsContent value="classes" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Department Classes</CardTitle>
                    <CardDescription>Classes in this department</CardDescription>
                  </div>
                  <Button size="sm" asChild>
                    <Link href="/admin/classes/create">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Add Class
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border dark:border-gray-800">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableHead className="font-medium">Class Name</TableHead>
                          <TableHead className="font-medium">Teacher</TableHead>
                          <TableHead className="font-medium">Students</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {department.classes.map((cls) => (
                          <TableRow key={cls.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            <TableCell className="font-medium dark:text-white">
                              <Link href={`/admin/classes/${cls.id}`} className="hover:underline">
                                {cls.name}
                              </Link>
                            </TableCell>
                            <TableCell className="dark:text-gray-300">{cls.teacher}</TableCell>
                            <TableCell className="dark:text-gray-300">{cls.students}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/classes/${cls.id}`}>View</Link>
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
          </Tabs>
        </div>
      </div>
    </div>
  )
}
