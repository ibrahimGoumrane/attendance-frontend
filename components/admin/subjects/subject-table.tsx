"use client";

import { useState } from "react";
import Link from "next/link";
import { BookText, MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import type { Subject } from "@/lib/types/subject";

// Mock data - replace with actual data fetching
const subjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    teacher: {
      id: "1",
      user: {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        role: "teacher",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
      },
      department: "1",
    },
    section_promo: {
      id: "1",
      name: "Class 10A",
      studentCount: 25,
    },
  },
  {
    id: "2",
    name: "Physics",
    teacher: {
      id: "2",
      user: {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        role: "teacher",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
      },
      department: "1",
    },
    section_promo: {
      id: "2",
      name: "Class 10B",
      studentCount: 22,
    },
  },
  {
    id: "3",
    name: "Chemistry",
    teacher: {
      id: "3",
      user: {
        id: "3",
        firstName: "Robert",
        lastName: "Johnson",
        email: "robert.johnson@example.com",
        role: "teacher",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
      },
      department: "2",
    },
    section_promo: {
      id: "1",
      name: "Class 10A",
      studentCount: 25,
    },
  },
  {
    id: "4",
    name: "Biology",
    teacher: {
      id: "4",
      user: {
        id: "4",
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah.williams@example.com",
        role: "teacher",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
      },
      department: "2",
    },
    section_promo: {
      id: "3",
      name: "Class 11A",
      studentCount: 20,
    },
  },
  {
    id: "5",
    name: "History",
    teacher: {
      id: "5",
      user: {
        id: "5",
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
        role: "teacher",
        created_at: "2023-01-01",
        updated_at: "2023-01-01",
      },
      department: "3",
    },
    section_promo: {
      id: "4",
      name: "Class 11B",
      studentCount: 18,
    },
  },
];

export function SubjectsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${subject.teacher.user.firstName} ${subject.teacher.user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      subject.section_promo.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search subjects..."
          className="h-9 md:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Name</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <BookText className="h-8 w-8 mb-2" />
                      <p>No subjects found</p>
                      {searchQuery && (
                        <p className="text-sm">
                          Try adjusting your search query
                        </p>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/admin/subjects/${subject.id}`}
                        className="hover:underline flex items-center gap-2"
                      >
                        <BookText className="h-4 w-4" />
                        {subject.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/teachers/${subject.teacher.id}`}
                        className="hover:underline"
                      >
                        {subject.teacher.user.firstName}{" "}
                        {subject.teacher.user.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/classes/${subject.section_promo.id}`}
                        className="hover:underline"
                      >
                        {subject.section_promo.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {subject.section_promo.studentCount} students
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/subjects/${subject.id}`}>
                            <span className="sr-only">View</span>
                            <BookText className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/subjects/${subject.id}`}>
                                View details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/subjects/${subject.id}/edit`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              asChild
                            >
                              <Link
                                href={`/admin/subjects/${subject.id}?delete=true`}
                              >
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
