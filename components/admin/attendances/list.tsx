"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Filter,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Attendance } from "@/lib/types/attendance";
import { Subject } from "@/lib/types/subject";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/lib/types/student";
import CreateAttendanceForm from "./create";
import UpdateAttendanceForm from "./edit";
import DeleteAttendance from "./delete";

interface ListAttendancesProps {
  attendances: Attendance[];
  subjects: Subject[];
  students?: Student[];
}

export function ListAttendances({
  attendances,
  subjects,
  students = [],
}: ListAttendancesProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal state management
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null);

  const handleEditClick = (attendance: Attendance) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedAttendance(attendance);
  };

  const handleDeleteClick = (attendance: Attendance) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedAttendance(attendance);
  };

  // Filter attendances based on selected filters
  const filteredAttendances = attendances.filter((attendance) => {
    const subjectMatch =
      selectedSubject === "all" || attendance.subject.id === selectedSubject;
    const statusMatch =
      selectedStatus === "all" || attendance.status === selectedStatus;
    const dateMatch =
      !selectedDate ||
      (new Date(attendance.date).getDate() === selectedDate.getDate() &&
        new Date(attendance.date).getMonth() === selectedDate.getMonth() &&
        new Date(attendance.date).getFullYear() === selectedDate.getFullYear());

    return subjectMatch && statusMatch && dateMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAttendances.length / itemsPerPage);
  const paginatedAttendances = filteredAttendances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Group attendances by date for the summary
  const attendanceByDate = attendances.reduce((acc, attendance) => {
    const dateStr = format(new Date(attendance.date), "yyyy-MM-dd");
    if (!acc[dateStr]) {
      acc[dateStr] = { total: 0, present: 0, absent: 0 };
    }
    acc[dateStr].total += 1;
    if (attendance.status === "present") {
      acc[dateStr].present += 1;
    } else {
      acc[dateStr].absent += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; present: number; absent: number }>);

  // Calculate overall statistics
  const totalAttendances = attendances.length;
  const presentCount = attendances.filter((a) => a.status === "present").length;
  const absentCount = attendances.filter((a) => a.status === "absent").length;
  const presentPercentage =
    totalAttendances > 0 ? (presentCount / totalAttendances) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      {" "}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track and manage student attendance records
          </p>
        </div>
        <CreateAttendanceForm subjects={subjects} students={students}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Record Attendance
          </Button>
        </CreateAttendanceForm>
      </div>
      <div className="space-y-6">
        {/* Stat cards - already responsive with grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAttendances}</div>
              <p className="text-xs text-muted-foreground">
                Across {Object.keys(attendanceByDate).length} days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {presentPercentage.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                {presentCount} present, {absentCount} absent
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subjects.length}</div>
              <p className="text-xs text-muted-foreground">
                With recorded attendance
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              View and filter attendance records by subject, date, and status
            </CardDescription>

            {/* Filter controls - improved responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedSubject("all");
                  setSelectedDate(undefined);
                  setSelectedStatus("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {paginatedAttendances.length > 0 ? (
              <>
                {/* Table with horizontal scrolling for small screens */}
                <div className="overflow-auto">
                  {" "}
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAttendances.map((attendance) => (
                        <TableRow key={attendance.id}>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(attendance.date), "PP")}
                          </TableCell>
                          <TableCell className="font-medium">
                            {attendance.subject.name}
                          </TableCell>
                          <TableCell>
                            {attendance.student.user.firstName}{" "}
                            {attendance.student.user.lastName}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                attendance.status === "present"
                                  ? "default"
                                  : "destructive"
                              }
                              className={
                                attendance.status === "present"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                                  : ""
                              }
                            >
                              {attendance.status === "present"
                                ? "Present"
                                : "Absent"}
                            </Badge>
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
                                  onClick={() => handleEditClick(attendance)}
                                >
                                  <button className="flex items-center justify-start">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </button>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600 dark:text-red-400"
                                  onClick={() => handleDeleteClick(attendance)}
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
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Responsive pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-0 sm:mt-4">
                    <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(
                        currentPage * itemsPerPage,
                        filteredAttendances.length
                      )}{" "}
                      of {filteredAttendances.length} records
                    </div>
                    <div className="flex items-center justify-center sm:justify-end space-x-2 order-1 sm:order-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-sm">
                        Page {currentPage} of {totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Filter className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No records found</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  No attendance records match your current filters. Try
                  adjusting your filters or adding new attendance records.
                </p>
              </div>
            )}
          </CardContent>{" "}
        </Card>
      </div>
      {/* Modal components */}
      {selectedAttendance && (
        <>
          <UpdateAttendanceForm
            attendanceData={selectedAttendance}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />
          <DeleteAttendance
            id={selectedAttendance.id}
            open={deleteModalOpen}
            setIsOpen={setDeleteModalOpen}
          />
        </>
      )}
    </div>
  );
}
