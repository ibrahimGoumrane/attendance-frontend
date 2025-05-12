"use client";

import { Button } from "@/components/ui/button";
import { Class } from "@/lib/types/class";
import { Department } from "@/lib/types/department";
import { ArrowLeft, Edit, Link, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateDepartmentForm from "./edit";
import DeleteDepartment from "./delete";

interface MainProps {
  department: Department;
}

export default function Main({ department }: MainProps) {
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
            onClick={() => handleEditClick(department)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDeleteClick(department)}
            className=""
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div> */}

      {selectedClass && (
        <>
          <UpdateDepartmentForm
            departmentData={department}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />
          <DeleteDepartment
            id={selectedClass.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
}
