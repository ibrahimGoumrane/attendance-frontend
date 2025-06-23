"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Edit, Filter, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Attendance } from "@/lib/types/attendance";
import { Subject } from "@/lib/types/subject";
import UpdateAttendanceForm from "./edit";
import DeleteAttendance from "./delete";

interface AttendanceListProps {
  records: Attendance[];
  subjects: Subject[];
}

export function AttendanceList({ records, subjects }: AttendanceListProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Attendance | null>(null);

  const handleEditClick = (attendance: Attendance) => {
    setDeleteModalOpen(false);
    setEditModalOpen(true);
    setSelectedRecord(attendance);
  };

  const handleDeleteClick = (attendance: Attendance) => {
    setEditModalOpen(false);
    setDeleteModalOpen(true);
    setSelectedRecord(attendance);
  };

  // Filter records based on selected filters
  const filteredRecords = records.filter(record => {
    const subjectMatch = selectedSubject === "all" || record.subject.id === selectedSubject;
    const statusMatch = selectedStatus === "all" || record.status === selectedStatus;
    const dateMatch =
      !selectedDate ||
      (new Date(record.date).getDate() === selectedDate.getDate() &&
        new Date(record.date).getMonth() === selectedDate.getMonth() &&
        new Date(record.date).getFullYear() === selectedDate.getFullYear());

    return subjectMatch && statusMatch && dateMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate statistics
  const totalRecords = records.length;
  const presentCount = records.filter(r => r.status === "present").length;
  const absentCount = records.filter(r => r.status === "absent").length;
  const totalStudentRecords = presentCount + absentCount;
  const overallAttendanceRate = totalStudentRecords > 0 ? (presentCount / totalStudentRecords) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
            <p className="text-xs text-muted-foreground">Total attendance records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallAttendanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {presentCount} present out of {totalStudentRecords}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Subjects with attendance records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>View and manage your attendance records</CardDescription>

          {/* Filter controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            <Select
              value={selectedSubject}
              onValueChange={val => {
                setSelectedSubject(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={date => {
                    setSelectedDate(date);
                    setCurrentPage(1);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select
              value={selectedStatus}
              onValueChange={val => {
                setSelectedStatus(val);
                setCurrentPage(1);
              }}
            >
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
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {paginatedRecords.length > 0 ? (
            <>
              <div className="overflow-auto">
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
                    {paginatedRecords.map(record => (
                      <TableRow key={record.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(record.date), "PP")}
                        </TableCell>
                        <TableCell className="font-medium">{record.subject.name}</TableCell>
                        <TableCell>
                          {record.student.user.firstName} {record.student.user.lastName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={record.status === "present" ? "default" : "destructive"}
                            className={
                              record.status === "present"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                                : ""
                            }
                          >
                            {record.status === "present" ? "Present" : "Absent"}
                          </Badge>
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
                              <DropdownMenuItem onClick={() => handleEditClick(record)}>
                                <button className="flex items-center justify-start">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </button>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600 dark:text-red-400"
                                onClick={() => handleDeleteClick(record)}
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-0 sm:mt-4">
                  <div className="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length}{" "}
                    records
                  </div>
                  <div className="flex items-center justify-center sm:justify-end space-x-2 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
                No attendance records match your current filters. Try adjusting your filters or record new
                attendance.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      {selectedRecord && (
        <>
          <UpdateAttendanceForm
            attendanceData={selectedRecord}
            open={editModalOpen}
            setIsOpen={setEditModalOpen}
          />
          <DeleteAttendance id={selectedRecord.id} open={deleteModalOpen} setIsOpen={setDeleteModalOpen} />
        </>
      )}
    </div>
  );
}
