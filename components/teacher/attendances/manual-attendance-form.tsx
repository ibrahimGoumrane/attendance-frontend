"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Check, X, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Subject } from "@/lib/types/subject";
import { Student } from "@/lib/types/student";
import { confirmAttendance } from "@/lib/actions/attendance";
import { SubjectAttendanceConfirmRequest } from "@/lib/types/attendance";

interface ManualAttendanceFormProps {
  subjects: Subject[];
  students: Student[];
  onBack: () => void;
}

type Status = "present" | "absent";

interface StudentWithStatus extends Student {
  status: Status;
}

export function ManualAttendanceForm({ subjects, students: allStudents, onBack }: ManualAttendanceFormProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedDateTime, setSelectedDateTime] = useState<string>(new Date().toISOString().slice(0, 16));
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [subjectStudents, setSubjectStudents] = useState<StudentWithStatus[]>([]);

  // Update subject students when subject changes
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    const subject = subjects.find(s => s.id === value);
    if (subject) {
      const filteredStudents = allStudents
        .filter(student => student.section_promo === subject.section_promo.id)
        .map(student => ({ ...student, status: "present" as const }));
      setSubjectStudents(filteredStudents);
    } else {
      setSubjectStudents([]);
    }
  };

  const toggleStudentStatus = (studentId: string) => {
    setSubjectStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, status: student.status === "present" ? "absent" : "present" }
          : student
      )
    );
  };

  const markAllPresent = () => {
    setSubjectStudents(prev => prev.map(student => ({ ...student, status: "present" })));
  };

  const markAllAbsent = () => {
    setSubjectStudents(prev => prev.map(student => ({ ...student, status: "absent" })));
  };

  // Filter students based on search term
  const filteredStudents = subjectStudents.filter(student => {
    const studentName = student.user.lastName + " " + student.user.firstName;
    return studentName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Update stats calculation
  const presentCount = subjectStudents.filter(s => s.status === "present").length;
  const absentCount = subjectStudents.filter(s => s.status === "absent").length;
  const attendanceRate = subjectStudents.length > 0 ? (presentCount / subjectStudents.length) * 100 : 0;

  // Update handleSave to use subjectStudents
  const handleSave = async () => {
    if (!selectedSubject) return;
    setIsSaving(true);

    try {
      const dateTimeWithSeconds = selectedDateTime.replace("T", " ") + ":00";
      
      const attendanceData: SubjectAttendanceConfirmRequest = {
        date: dateTimeWithSeconds,
        subject_id: selectedSubject,
        students: subjectStudents.map(student => ({
          student_id: student.id,
          status: student.status,
        })),
      };

      const result = await confirmAttendance(attendanceData);

      if (result.success) {
        toast.success("Attendance Saved Successfully", {
          description: `Manual attendance for ${subjectStudents.length} students has been recorded.`,
        });
        onBack();
      } else {
        throw new Error(result.error || "Failed to save attendance");
      }
    } catch (error) {
      toast.error("Error Saving Attendance", {
        description: "There was an error saving the attendance. Please try again.",
        action: {
          label: "Retry",
          onClick: () => handleSave(),
        },
      });
      console.error("Error saving attendance:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <CardTitle>Manual Attendance Recording</CardTitle>
            <CardDescription>Mark attendance for each student individually</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{presentCount} Present</Badge>
            <Badge variant="outline">{absentCount} Absent</Badge>
            <Badge variant="secondary">{attendanceRate.toFixed(1)}% Rate</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Settings */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={selectedSubject} onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name} - {subject.section_promo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date & Time</Label>
            <Input
              type="datetime-local"
              value={selectedDateTime}
              onChange={e => setSelectedDateTime(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>

        {/* Search and bulk actions */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllPresent}>
              <Check className="h-4 w-4 mr-2" />
              Mark All Present
            </Button>
            <Button variant="outline" size="sm" onClick={markAllAbsent}>
              <X className="h-4 w-4 mr-2" />
              Mark All Absent
            </Button>
          </div>
        </div>

        {/* Students list */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {!selectedSubject ? (
            <div className="text-center p-4 text-muted-foreground">
              Please select a subject to view students
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No students found {searchTerm && "matching search criteria"}
            </div>
          ) : (
            filteredStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={student.status === "present" ? "default" : "destructive"}
                    className={
                      student.status === "present" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                    }
                  >
                    {student.status === "present" ? "Present" : "Absent"}
                  </Badge>
                  <span className="font-medium">{student.user.lastName + " " + student.user.firstName}</span>
                </div>
                <Switch
                  checked={student.status === "present"}
                  onCheckedChange={() => toggleStudentStatus(student.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedSubject || isSaving} className="flex-1">
            {isSaving ? (
              <>
                <Save className="h-4 w-4 mr-2 animate-pulse" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Attendance
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
