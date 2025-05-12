"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Upload,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";
import { Department } from "@/lib/types/department";

import CreateDepartmentModal from "@/components/admin/departments/create";
import UpdateDepartmentForm from "@/components/admin/departments/edit";
import DeleteDepartment from "@/components/admin/departments/delete";
// import DeleteDepartment from "@/components/admin/departments/delete";

export default function DepartmentList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const { items: departments } = useDepartmentContext();

  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (dept: Department) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedDepartment(dept);
  };

  const handleDeleteClick = (dept: Department) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedDepartment(dept);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Departments</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Manage academic departments.
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
          <CreateDepartmentModal>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </CreateDepartmentModal>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Departments List</CardTitle>
          <CardDescription>
            Showing {filteredDepartments.length} of {departments.length} departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-md border dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Classes</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((dept) => (
                    <TableRow
                      key={dept.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="font-medium dark:text-white">
                        <Link href={`/admin/departments/${dept.id}`} className="hover:underline">
                          {dept.name}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {dept.teacherCount}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link
                                href={`/admin/departments/${dept.id}`}
                                className="flex w-full"
                              >
                                View details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-9"
                                onClick={() => handleEditClick(dept)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteClick(dept)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No departments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to{" "}
              <strong>{filteredDepartments.length}</strong> of{" "}
              <strong>{filteredDepartments.length}</strong> departments
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

      {selectedDepartment && (
        <>
          <UpdateDepartmentForm
            departmentData={selectedDepartment}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />
          <DeleteDepartment
            id={selectedDepartment.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
}
