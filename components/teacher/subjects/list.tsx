"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Edit, MoreHorizontal, Plus, Search, Trash2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Subject } from "@/lib/types/subject";
import { Teacher } from "@/lib/types/teacher";
import { Class } from "@/lib/types/class";
import CreateSubjectForm from "./create";
import UpdateSubjectForm from "./edit";
import DeleteSubject from "./delete";

interface SubjectListProps {
  teacher_subjects: Subject[];
  teacher: Teacher;
  classes: Class[];
}

export default function SubjectList({ teacher_subjects, teacher, classes }: SubjectListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All Classes");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const filteredSubjects = teacher_subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === "All Classes" || subject?.section_promo?.id === selectedClass;

    return matchesSearch && matchesClass;
  });

  const handleEditClick = (subject: Subject) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedSubject(subject);
  };

  const handleDeleteClick = (subject: Subject) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedSubject(subject);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">My Subjects</h1>
          <p className="text-muted-foreground dark:text-gray-400">Manage your assigned subjects.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Upload className="h-4 w-4 mr-2" />
            Export
          </Button>
          <CreateSubjectForm teacher={teacher} classes={classes}>
            <Button size="sm" className="h-9">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </CreateSubjectForm>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Subjects</CardTitle>
          <CardDescription>
            Showing {filteredSubjects.length} of {teacher_subjects.length} subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Subjects..."
                className="pl-8"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedClass} onValueChange={val => setSelectedClass(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Classes">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="font-medium">Subject</TableHead>
                  <TableHead className="font-medium">Class</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map(subject => (
                    <TableRow key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <TableCell className="dark:text-white font-medium">
                        <Link href={`/teacher/subjects/${subject.id}`} className="hover:underline">
                          {subject.name}
                        </Link>
                      </TableCell>
                      <TableCell className="dark:text-gray-300">{subject.section_promo?.name}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleEditClick(subject)}>
                              <button className="flex items-center justify-start">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDeleteClick(subject)}
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
                    <TableCell colSpan={3} className="h-24 text-center">
                      No subjects found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>{filteredSubjects.length}</strong> of{" "}
              <strong>{teacher_subjects.length}</strong> subjects
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

      {selectedSubject && (
        <>
          <UpdateSubjectForm
            subjectData={selectedSubject}
            teacher={teacher} // Pass single teacher instead of teachers array
            classes={classes}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />

          <DeleteSubject id={selectedSubject.id} open={deleteModalOpen} setIsOpen={setDeleteModalOpen} />
        </>
      )}
    </div>
  );
}
