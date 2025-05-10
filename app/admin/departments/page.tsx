"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";

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

// Mock data for departments
const departments = [
  {
    id: "1",
    name: "Computer Science",
    description: "Study of computers and computational systems",
    teachers: 8,
    classes: 12,
  },
  {
    id: "2",
    name: "Mathematics",
    description: "Study of numbers, quantities, and shapes",
    teachers: 10,
    classes: 15,
  },
  {
    id: "3",
    name: "Physics",
    description: "Study of matter, energy, and the interaction between them",
    teachers: 6,
    classes: 8,
  },
  {
    id: "4",
    name: "Chemistry",
    description:
      "Study of the composition, structure, properties, and change of matter",
    teachers: 7,
    classes: 9,
  },
  {
    id: "5",
    name: "Biology",
    description: "Study of living organisms and their interactions",
    teachers: 9,
    classes: 11,
  },
  {
    id: "6",
    name: "English",
    description: "Study of language, literature, and writing",
    teachers: 12,
    classes: 18,
  },
  {
    id: "7",
    name: "History",
    description: "Study of past events",
    teachers: 5,
    classes: 7,
  },
  {
    id: "8",
    name: "Geography",
    description:
      "Study of places and the relationships between people and their environments",
    teachers: 4,
    classes: 6,
  },
];

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter departments based on search query
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      department.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">
            Departments
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Manage academic departments.
          </p>
        </div>
        <Button size="sm" className="h-9 w-fit">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Departments List</CardTitle>
          <CardDescription>
            Showing {filteredDepartments.length} of {departments.length}{" "}
            departments
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
                  <TableHead className="font-medium">Description</TableHead>
                  <TableHead className="font-medium">Teachers</TableHead>
                  <TableHead className="font-medium">Classes</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department) => (
                    <TableRow
                      key={department.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <TableCell className="font-medium dark:text-white">
                        <Link
                          href={`/admin/departments/${department.id}`}
                          className="hover:underline"
                        >
                          {department.name}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {department.description}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {department.teachers}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {department.classes}
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
                                href={`/admin/departments/${department.id}`}
                                className="flex w-full"
                              >
                                View details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link
                                href={`/admin/departments/${department.id}/edit`}
                                className="flex w-full"
                              >
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      No departments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
