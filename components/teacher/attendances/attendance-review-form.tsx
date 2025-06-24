"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check, Save, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Subject } from "@/lib/types/subject";
import { ProcessedAttendance } from "./attendance-recorder";
import { DialogTitle } from "@radix-ui/react-dialog";
import { SubjectAttendanceConfirmRequest } from "@/lib/types/attendance";
import { confirmAttendance } from "@/lib/actions/attendance";

interface AttendanceReviewFormProps {
  data: ProcessedAttendance;
  subjects: Subject[];
  onBack: () => void;
}

interface CustomStudent {
  id: string;
  name: string;
  status: "present" | "absent";
}

export function AttendanceReviewForm({ data, subjects, onBack }: AttendanceReviewFormProps) {
  const [students, setStudents] = useState<CustomStudent[]>(data.students);
  const [selectedSubject, setSelectedSubject] = useState<string>(data.selectedSubject || "");
  const [selectedDateTime, setSelectedDateTime] = useState<string>(
    data.selectedDateTime ? data.selectedDateTime.slice(0, 16) : new Date().toISOString().slice(0, 16)
  );
  const [uploadedImages] = useState<File[]>(data.uploadedImages || []);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStudentStatus = (studentId: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === studentId
          ? { ...student, status: student.status === "present" ? "absent" : "present" }
          : student
      )
    );
  };

  const handleConfirm = async () => {
    if (!selectedSubject) return;
    setIsSaving(true);

    try {
      const dateTimeWithSeconds = selectedDateTime + ":00";

      const attendanceData: SubjectAttendanceConfirmRequest = {
        date: dateTimeWithSeconds,
        subject_id: selectedSubject,
        students: students.map(student => ({
          student_id: student.id,
          status: student.status,
        })),
      };

      const result = await confirmAttendance(attendanceData);

      if (result.success) {
        toast.success("Attendance Saved Successfully", {
          description: `Attendance for ${students.length} students has been recorded.`,
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
          onClick: () => handleConfirm(),
        },
      });
      console.error("Error saving attendance:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const presentCount = students.filter(s => s.status === "present").length;
  const absentCount = students.filter(s => s.status === "absent").length;
  const attendanceRate = students.length > 0 ? (presentCount / students.length) * 100 : 0;

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <CardTitle>Review & Confirm Attendance</CardTitle>
            <CardDescription>
              Review the processed attendance results and make any necessary adjustments
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline">{presentCount} Present</Badge>
            <Badge variant="outline">{absentCount} Absent</Badge>
            <Badge variant="secondary">{attendanceRate.toFixed(1)}% Rate</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled>
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

        {uploadedImages.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium">Uploaded Images ({uploadedImages.length})</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {uploadedImages.map((file, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => setSelectedImage(URL.createObjectURL(file))}
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-full object-cover rounded-lg border hover:opacity-80 transition-opacity"
                    width={200}
                    height={100}
                  />
                  <div className="absolute bottom-1 left-1 right-1 bg-black/50 text-white text-xs p-1 rounded truncate">
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogTitle className="text-lg font-semibold">Enlarged Image View</DialogTitle>
          <DialogContent className="max-w-6xl">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto"
                width={800}
                height={600}
                style={{ objectFit: "contain" }}
              />
            )}
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          <div className="relative w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {filteredStudents.map(student => (
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
                  <span className="font-medium">{student.name}</span>
                </div>
                <Switch
                  checked={student.status === "present"}
                  onCheckedChange={() => toggleStudentStatus(student.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedSubject || isSaving} className="flex-1">
            {isSaving ? (
              <>
                <Save className="h-4 w-4 mr-2 animate-pulse" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Confirm & Save
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
