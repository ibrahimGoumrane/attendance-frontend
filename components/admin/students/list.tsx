"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student } from "@/lib/types/student";
import { Class } from "@/lib/types/class";

interface StudentListProps {
  students: Student[],
  classes: Class[],
}

export default function StudentList({students, classes} : StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.user!.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user!.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user!.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClass === "All Classes" || student.section_promo === selectedClass;

    return matchesSearch && matchesClass;
  });

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Students
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Manage student accounts and information.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="h-9" asChild>
            <Link href="/admin/students/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Students List</CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {students.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2">
              <Select
                value={selectedClass}
                onValueChange={(val) => setSelectedClass(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">Class</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="dark:text-white font-medium">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="hover:underline"
                        >
                          {student.user!.firstName} {student.user!.lastName}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {student.user!.email}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {classes.find((cls) => cls.id == student.section_promo)?.name}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <button
                                onClick={() => handleEditClick(student)}
                                className="flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <button
                                onClick={() => handleDeleteClick(student)}
                                className="flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to{" "}
              <strong>{filteredStudents.length}</strong> of{" "}
              <strong>{filteredStudents.length}</strong> students
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replace with actual modals if needed */}
      {selectedStudent && (
        <>
          {/* <UpdateStudentForm
            studentData={selectedStudent}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          /> */}
          {/* <DeleteStudent
            id={selectedStudent.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          /> */}
        </>
      )}
    </div>
  );
}
