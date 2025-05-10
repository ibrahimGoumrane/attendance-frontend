"use client"

import { useState } from "react"
import { Download, Plus, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for students
const students = [
  {
    id: "1",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@student.edu",
    class: "10A",
    department: "Computer Science",
  },
  {
    id: "2",
    firstName: "Emma",
    lastName: "Williams",
    email: "emma.williams@student.edu",
    class: "10A",
    department: "Computer Science",
  },
  {
    id: "3",
    firstName: "Noah",
    lastName: "Brown",
    email: "noah.brown@student.edu",
    class: "10B",
    department: "Mathematics",
  },
  {
    id: "4",
    firstName: "Olivia",
    lastName: "Jones",
    email: "olivia.jones@student.edu",
    class: "10B",
    department: "Mathematics",
  },
  {
    id: "5",
    firstName: "William",
    lastName: "Miller",
    email: "william.miller@student.edu",
    class: "11A",
    department: "Physics",
  },
  {
    id: "6",
    firstName: "Sophia",
    lastName: "Davis",
    email: "sophia.davis@student.edu",
    class: "11A",
    department: "Physics",
  },
  {
    id: "7",
    firstName: "James",
    lastName: "Garcia",
    email: "james.garcia@student.edu",
    class: "11B",
    department: "Chemistry",
  },
  {
    id: "8",
    firstName: "Charlotte",
    lastName: "Rodriguez",
    email: "charlotte.rodriguez@student.edu",
    class: "11B",
    department: "Chemistry",
  },
  {
    id: "9",
    firstName: "Benjamin",
    lastName: "Wilson",
    email: "benjamin.wilson@student.edu",
    class: "12A",
    department: "Biology",
  },
  {
    id: "10",
    firstName: "Amelia",
    lastName: "Martinez",
    email: "amelia.martinez@student.edu",
    class: "12A",
    department: "Biology",
  },
]

// Mock data for classes
const classes = ["All Classes", "10A", "10B", "11A", "11B", "12A", "12B"]

// Mock data for departments
const departments = ["All Departments", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("All Classes")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")

  // Filter students based on search query, selected class, and selected department
  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesClass = 
      selectedClass === "All Classes" || 
      student.class === selectedClass
    
    const matchesDepartment = 
      selectedDepartment === "All Departments" || 
      student.department === selectedDepartment
    
    return matchesSearch && matchesClass && matchesDepartment
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight dark:text-white">Students</h1>
          <p className="text-muted-foreground dark:text-gray-400">Manage student accounts and information.</p>
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
          <Button size="sm" className="h-9">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Students List</CardTitle>
          <CardDescription>
            Showing {filteredStudents.length} of {students.length} students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select 
                value={selectedClass} 
                onValueChange={setSelectedClass}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={selectedDepartment} 
                onValueChange={setSelectedDepartment}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  \
