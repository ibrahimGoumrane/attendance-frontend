"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, UserX, Eye } from "lucide-react"

const classData = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    teacher: "Dr. Sarah Johnson",
    time: "09:00 - 10:30",
    totalStudents: 45,
    presentStudents: 42,
    absentStudents: [
      { name: "John Smith", reason: "Sick leave" },
      { name: "Emma Davis", reason: "Late arrival" },
      { name: "Michael Brown", reason: "Unknown" },
    ],
    room: "Room 201",
    status: "ongoing",
  },
  {
    id: 2,
    subject: "Computer Science Fundamentals",
    teacher: "Prof. David Wilson",
    time: "10:45 - 12:15",
    totalStudents: 38,
    presentStudents: 35,
    absentStudents: [
      { name: "Lisa Anderson", reason: "Medical appointment" },
      { name: "James Taylor", reason: "Unknown" },
      { name: "Sophie Miller", reason: "Family emergency" },
    ],
    room: "Lab 105",
    status: "ongoing",
  },
  {
    id: 3,
    subject: "Physics Laboratory",
    teacher: "Dr. Maria Garcia",
    time: "13:30 - 15:00",
    totalStudents: 32,
    presentStudents: 29,
    absentStudents: [
      { name: "Alex Thompson", reason: "Sports event" },
      { name: "Rachel Green", reason: "Unknown" },
      { name: "Tom Wilson", reason: "Late arrival" },
    ],
    room: "Lab 203",
    status: "upcoming",
  },
  {
    id: 4,
    subject: "English Literature",
    teacher: "Ms. Jennifer Lee",
    time: "15:15 - 16:45",
    totalStudents: 41,
    presentStudents: 38,
    absentStudents: [
      { name: "Daniel Clark", reason: "Unknown" },
      { name: "Olivia Martinez", reason: "Sick leave" },
      { name: "Ryan Adams", reason: "Personal reasons" },
    ],
    room: "Room 301",
    status: "upcoming",
  },
]

export function ClassAttendanceMonitor() {
  return (
    <div className="space-y-4">
      {classData.map((classItem) => {
        const attendanceRate = (classItem.presentStudents / classItem.totalStudents) * 100

        return (
          <div key={classItem.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{classItem.subject}</h3>
                  <Badge variant={classItem.status === "ongoing" ? "default" : "secondary"}>{classItem.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {classItem.teacher}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {classItem.time}
                  </span>
                  <span>{classItem.room}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className="text-sm font-bold">{attendanceRate.toFixed(1)}%</span>
                </div>
                <Progress value={attendanceRate} className="h-2" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Present:</span>
                    <span className="font-medium text-green-600">{classItem.presentStudents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Absent:</span>
                    <span className="font-medium text-red-600">{classItem.absentStudents.length}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <UserX className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Absent Students</span>
                </div>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {classItem.absentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between text-xs bg-muted/50 rounded p-2">
                      <span className="font-medium">{student.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {student.reason}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
