"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, Filter } from "lucide-react";

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

interface AttendanceHistoryProps {
  attendances: Attendance[];
  subjects: Subject[];
}

export function AttendanceHistory({
  attendances,
  subjects,
}: AttendanceHistoryProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter attendances based on selected filters
  const filteredAttendances = attendances.filter((attendance) => {
    const subjectMatch =
      selectedSubject === "all" || attendance.subject.id === selectedSubject;
    const statusMatch =
      selectedStatus === "all" || attendance.status === selectedStatus;
    const dateMatch =
      !selectedDate ||
      (attendance.date.getDate() === selectedDate.getDate() &&
        attendance.date.getMonth() === selectedDate.getMonth() &&
        attendance.date.getFullYear() === selectedDate.getFullYear());

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
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
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-[200px]">
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
                  className="w-full sm:w-[240px] justify-start text-left font-normal"
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
              <SelectTrigger className="w-full sm:w-[200px]">
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
              className="sm:ml-auto"
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
        <CardContent>
          {paginatedAttendances.length > 0 ? (
            <>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Date
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Subject
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Student
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {paginatedAttendances.map((attendance) => (
                      <tr key={attendance.id} className="hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">
                          {format(new Date(attendance.date), "PPP")}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium">
                          {attendance.subject.name}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {attendance.student.user.firstName}{" "}
                          {attendance.student.user.lastName}
                        </td>
                        <td className="py-3 px-4 text-sm">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredAttendances.length
                    )}{" "}
                    of {filteredAttendances.length} records
                  </div>
                  <div className="flex items-center space-x-2">
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
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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
                No attendance records match your current filters. Try adjusting
                your filters or adding new attendance records.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
