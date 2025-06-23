"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Camera, Users } from "lucide-react";
import { ManualAttendanceForm } from "./manual-attendance-form";
import { ImageUploadForm } from "./image-upload-form";
import { AttendanceReviewForm } from "./attendance-review-form";
import { Subject } from "@/lib/types/subject";
import { Student } from "@/lib/types/student";
import { SubjectAttendanceProcessResponse } from "@/lib/types/attendance";

interface AttendanceRecorderProps {
  subjects: Subject[];
  students: Student[];
}

type RecordingMode = "manual" | "image" | "review";

export interface ProcessedAttendance extends SubjectAttendanceProcessResponse{
  selectedSubject?: string;
  selectedDateTime?: string;
  uploadedImages?: File[];
}

export function AttendanceRecorder({ subjects, students }: AttendanceRecorderProps) {
  const [recordingMode, setRecordingMode] = useState<RecordingMode | null>(null);
  const [processedAttendance, setProcessedAttendance] = useState<ProcessedAttendance | null>(null);

  const handleImageProcessingComplete = (data: ProcessedAttendance) => {
    setProcessedAttendance(data);
    setRecordingMode("review");
  };

  const handleBackToSelection = () => {
    setRecordingMode(null);
    setProcessedAttendance(null);
  };

  if (recordingMode === "manual") {
    return <ManualAttendanceForm subjects={subjects} students={students} onBack={handleBackToSelection} />;
  }

  if (recordingMode === "image") {
    return (
      <ImageUploadForm
        subjects={subjects}
        onBack={handleBackToSelection}
        onProcessingComplete={handleImageProcessingComplete}
      />
    );
  }

  if (recordingMode === "review" && processedAttendance) {
    return (
      <AttendanceReviewForm
        data={processedAttendance}
        subjects={subjects}
        onBack={handleBackToSelection}
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Manual Attendance</CardTitle>
              <CardDescription>Record attendance by selecting students individually</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Plus className="h-4 w-4" />
              <span>Select students one by one</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Full control over attendance marking</span>
            </div>
            <Button className="cursor-pointer w-full mt-4" onClick={() => setRecordingMode("manual")}>
              Start Manual Recording
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Camera className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Image Processing</CardTitle>
              <CardDescription>Upload classroom images to automatically detect attendance</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="h-4 w-4" />
              <span>Upload one or multiple images</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Camera className="h-4 w-4" />
              <span>AI-powered attendance detection</span>
            </div>
            <Button
              className="cursor-pointer w-full mt-4"
              variant="outline"
              onClick={() => setRecordingMode("image")}
            >
              Upload Images
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
