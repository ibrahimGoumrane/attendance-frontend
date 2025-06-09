"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { User, CalendarDays, BookOpen, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Attendance } from "@/lib/types/attendance"
import { useState, useMemo } from "react"
import type { Student } from "@/lib/types/student"

const getStatusBadge = (status: "present" | "absent") => {
  switch (status) {
    case "present":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
          Present
        </Badge>
      )
    case "absent":
      return <Badge variant="destructive">Absent</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

interface StudentAttendanceDisplayProps {
  student: Student
  attendances: Attendance[]
}

export default function StudentAttendanceDisplay({ student, attendances }: StudentAttendanceDisplayProps) {
  const [statusFilter, setStatusFilter] = useState<"all" | "present" | "absent">("all")
  const [subjectFilter, setSubjectFilter] = useState<string>("all")

  // Get unique subjects for the filter dropdown
  const uniqueSubjects = useMemo(() => {
    const subjects = attendances.map((record) => record.subject)
    const uniqueSubjectsMap = new Map()
    subjects.forEach((subject) => {
      uniqueSubjectsMap.set(subject.id, subject)
    })
    return Array.from(uniqueSubjectsMap.values())
  }, [attendances])

  // Filter the attendance records based on selected filters
  const filteredRecords = useMemo(() => {
    return attendances.filter((record) => {
      const statusMatch = statusFilter === "all" || record.status === statusFilter
      const subjectMatch = subjectFilter === "all" || record.subject.id === subjectFilter
      return statusMatch && subjectMatch
    })
  }, [statusFilter, subjectFilter, attendances])

  // Calculate stats based on all records (not filtered)
  const getAttendanceStats = (records: Attendance[]) => {
    const total = records.length
    const present = records.filter((record) => record.status === "present").length
    const absent = records.filter((record) => record.status === "absent").length
    const attendanceRate = total > 0 ? ((present / total) * 100).toFixed(1) : "0"

    return { total, present, absent, attendanceRate }
  }

  const stats = getAttendanceStats(attendances)

  const clearFilters = () => {
    setStatusFilter("all")
    setSubjectFilter("all")
  }

  const hasActiveFilters = statusFilter !== "all" || subjectFilter !== "all"

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Records</h1>
          <p className="text-muted-foreground">View your class attendance history</p>
        </div>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-lg font-semibold">{student.user.firstName + student.user.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Class</p>
              <p className="text-lg font-semibold">{student.section_promo}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-red-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Rate Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-medium text-muted-foreground">Attendance Rate</p>
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xl font-bold text-blue-600">{stats.attendanceRate}%</p>
              </div>
              <svg className="h-32 w-32" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray={`${Number(stats.attendanceRate) * 2.51} 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Select
                value={statusFilter}
                onValueChange={(value: "all" | "present" | "absent") => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Subject</label>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {uniqueSubjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center gap-2 mt-6 sm:mt-6"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {statusFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {statusFilter}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                </Badge>
              )}
              {subjectFilter !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Subject: {uniqueSubjects.find((s) => s.id === subjectFilter)?.name}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => setSubjectFilter("all")} />
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Attendance History
            {hasActiveFilters && (
              <Badge variant="outline" className="ml-2">
                Showing {filteredRecords.length} of {attendances.length} records
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Subject ID</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>{record.subject.name}</TableCell>
                      <TableCell className="text-muted-foreground">{record.subject.id}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No attendance records found matching the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
