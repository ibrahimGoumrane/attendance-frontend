"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Subject } from "@/lib/types/subject";
import { processAttendanceImages } from "@/lib/actions/attendance";
import { toast } from "sonner";
import { ProcessedAttendance } from "./attendance-recorder";

interface ImageUploadFormProps {
  subjects: Subject[];
  onBack: () => void;
  onProcessingComplete: (data: ProcessedAttendance) => void;
}

export function ImageUploadForm({ subjects, onBack, onProcessingComplete }: ImageUploadFormProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedDateTime, setSelectedDateTime] = useState<string>(new Date().toISOString().slice(0, 16));
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedSubject || uploadedFiles.length === 0) return;
    
    uploadedFiles.forEach(file => {
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        toast.error("Only JPEG, JPG, and PNG formats are allowed");
        return;
      }
    });

    if (uploadedFiles.reduce((total, file) => total + file.size, 0) > 5 * 1024 * 1024) {
      toast.error("Total size of all images should be less than 5MB");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();

      const dateTimeWithSeconds = selectedDateTime.replace("T", " ") + ":00";
      formData.append("date", dateTimeWithSeconds);

      const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
      formData.append("promo_section", selectedSubjectData?.section_promo.name || "");

      uploadedFiles.forEach((file, index) => {
        formData.append("images[]", file, "image_" + index + "." + file.name.split(".").pop());
      });

      const response = await processAttendanceImages(formData);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to process images");
      }

      onProcessingComplete({
        ...response.data,
        selectedSubject: selectedSubject,
        selectedDateTime: dateTimeWithSeconds,
        uploadedImages: uploadedFiles,
      });
    } catch (error) {
      toast.error("Failed to process images. error: " + (error || "Unknown error"));
      console.error("Failed to process images. error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <CardTitle>Upload Images for Attendance Processing</CardTitle>
            <CardDescription>
              Upload classroom images to automatically detect student attendance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
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

        <div className="space-y-4">
          <Label>Upload Images</Label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the images here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop images here, or click to select</p>
                <p className="text-sm text-muted-foreground">Supports JPEG, JPG, PNG formats</p>
                <p className="text-sm text-muted-foreground">The total size of all images should be less than 5MB</p>
              </div>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Images ({uploadedFiles.length})</Label>
              <div className="grid gap-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-sm truncate">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedSubject || uploadedFiles.length === 0 || isProcessing}
            className="flex-1"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Images...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Process Attendance
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
