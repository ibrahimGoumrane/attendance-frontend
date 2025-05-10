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
import { Student } from "@/lib/types/api";

// Mock data for students
const initialStudents = [
  {
    id: "1",
    firstName: "Alex",
    lastName: "Johnson",
    age: 16,
    email: "alex.johnson@student.edu",
    class: "10A",
    department: "Computer Science",
  },
  {
    id: "2",
    firstName: "Emma",
    lastName: "Williams",
    age: 16,
    email: "emma.williams@student.edu",
    class: "10A",
    department: "Computer Science",
  },
  {
    id: "3",
    firstName: "Noah",
    lastName: "Brown",
    age: 17,
    email: "noah.brown@student.edu",
    class: "10B",
    department: "Mathematics",
  },
  {
    id: "4",
    firstName: "Olivia",
    lastName: "Jones",
    age: 17,
    email: "olivia.jones@student.edu",
    class: "10B",
    department: "Mathematics",
  },
  {
    id: "5",
    firstName: "William",
    lastName: "Miller",
    age: 18,
    email: "william.miller@student.edu",
    class: "11A",
    department: "Physics",
  },
  {
    id: "6",
    firstName: "Sophia",
    lastName: "Davis",
    age: 18,
    email: "sophia.davis@student.edu",
    class: "11A",
    department: "Physics",
  },
  {
    id: "7",
    firstName: "James",
    lastName: "Garcia",
    age: 18,
    email: "james.garcia@student.edu",
    class: "11B",
    department: "Chemistry",
  },
  {
    id: "8",
    firstName: "Charlotte",
    lastName: "Rodriguez",
    age: 18,
    email: "charlotte.rodriguez@student.edu",
    class: "11B",
    department: "Chemistry",
  },
  {
    id: "9",
    firstName: "Benjamin",
    lastName: "Wilson",
    age: 19,
    email: "benjamin.wilson@student.edu",
    class: "12A",
    department: "Biology",
  },
  {
    id: "10",
    firstName: "Amelia",
    lastName: "Martinez",
    age: 19,
    email: "amelia.martinez@student.edu",
    class: "12A",
    department: "Biology",
  },
];
// Transform students array to match the schema
const students: Student[] = initialStudents.map((student) => ({
  id: student.id,
  section_promo: student.class, // Mapping class to section_promo
  user: {
    // Assuming userSchema contains these fields
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    age: student.age,
    department: student.department,
    role: "student", // Assuming role is always "student"
  },
  // latest_image is optional so we can leave it undefined
}));

// Mock data for classes
const classes = ["All Classes", "10A", "10B", "11A", "11B", "12A", "12B"];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");
  // Filter students based on search query, selected class, and selected department
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
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
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
