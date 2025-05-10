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
import { useStudentContext } from "@/lib/contexts/StudentContext";
import { useClassContext } from "@/lib/contexts/ClassContext";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  // Filter students based on search query, selected class, and selected department
  const { items: students } = useStudentContext();
  const { items: classes } = useClassContext();
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.user.firstName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      student.user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass =
      selectedClass === "All Classes" ||
      student.section_promo === selectedClass;

    return matchesSearch && matchesClass;
  });

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
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Select Promo section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.name}>
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
                      <TableCell className="font-medium dark:text-white">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="hover:underline"
                        >
                          {student.user.firstName} {student.user.lastName}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {student.user.email}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {student.section_promo}
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
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/students/${student.id}`}>
                                View details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/students/${student.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
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
    </div>
  );
}
