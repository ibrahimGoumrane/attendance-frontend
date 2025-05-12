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
import { Class } from "@/lib/types/class";
import CreateClassModal from "@/components/admin/classes/create";
import UpdateForm from "./edit";
import Delete from "./delete";
interface ClassesPageProps {
  classes: Class[];
}
export default function List({ classes }: ClassesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter classes based on search query and selected department
  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Classes
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Manage classes and course information.
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
          <CreateClassModal>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </CreateClassModal>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Classes List</CardTitle>
          <CardDescription>
            Showing {filteredClasses.length} of {classes.length} classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="font-medium">Class Name</TableHead>
                  <TableHead className="font-medium">Students</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((cls) => (
                    <TableRow
                      key={cls.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="font-medium dark:text-white">
                        <Link
                          href={`/admin/classes/${cls.id}`}
                          className="hover:underline"
                        >
                          {cls.name}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {cls.studentCount}
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
                              <Link
                                href={`/admin/classes/${cls.id}`}
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
                                onClick={() => handleEditClick(cls)}
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
                                onClick={() => handleDeleteClick(cls)}
                                className=""
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      No classes found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to{" "}
              <strong>{filteredClasses.length}</strong> of{" "}
              <strong>{filteredClasses.length}</strong> classes
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
      {selectedClass && (
        <>
          <UpdateForm
            classData={selectedClass}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />
          <Delete
            id={selectedClass.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
}
