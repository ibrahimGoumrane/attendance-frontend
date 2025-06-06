"use client";

import {
  Download,
  Edit,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import CreateTeacherModal from "@/components/admin/teachers/create";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Department } from "@/lib/types/department";
import { Teacher } from "@/lib/types/teacher";
import Delete from "./delete";
import UpdateForm from "./edit";

interface ListTeachersProps {
  teachers: Teacher[];
  departments: Department[];
}

const ListTeachers = ({ teachers, departments }: ListTeachersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

  // Filter teachers based on search query and selected department
  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher
        .user!.firstName.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      teacher
        .user!.lastName.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      teacher.user!.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      +teacher.department! === +selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Teachers
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Manage teacher accounts and information.
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
          <CreateTeacherModal departments={departments}>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Teacher
            </Button>
          </CreateTeacherModal>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Teachers List</CardTitle>
          <CardDescription>
            Showing {filteredTeachers.length} of {teachers.length} teachers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teachers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Departments">All Departments</SelectItem>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={String(department.id)}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">Department</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="font-medium dark:text-white">
                        <Link
                          href={`/admin/teachers/${teacher.id}`}
                          className="hover:underline"
                        >
                          {teacher.user!.firstName} {teacher.user!.lastName}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {teacher.user!.email}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {departments.find(
                          (dept) => dept.id === teacher.department
                        )?.name || "N/A"}
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
                            <DropdownMenuItem
                              onClick={() => handleEditClick(teacher)}
                            >
                              <button className="flex items-center justify-start ">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDeleteClick(teacher)}
                            >
                              <button className="flex items-center justify-start">
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
                      No teachers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to{" "}
              <strong>{filteredTeachers.length}</strong> of{" "}
              <strong>{filteredTeachers.length}</strong> teachers
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

      {/* This Part will be didicated for models */}
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

export default ListTeachers;
