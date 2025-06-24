import { z } from "zod";

// Create schema for student images
export const studentCreateImageSchema = z.object({
  student_id: z.string().min(1, "Student ID is required"),
  images: z.any().refine(
    (files) => {
      // Handle both single file and FileList cases
      if (typeof window === "undefined") {
        // Server-side: accept any file data
        return true;
      }
      // Client-side: validate FileList
      if (files instanceof FileList) {
        return Array.from(files).every(
          (file) =>
            file.size <= 10 * 1024 * 1024 && file.type.startsWith("image/")
        );
      }
      // Handle single file case
      if (files instanceof File) {
        return (
          files.size <= 10 * 1024 * 1024 && files.type.startsWith("image/")
        );
      }
      return false;
    },
    {
      message: "Please select valid image files (max 10MB each)",
    }
  ),
});

// Delete schema for student images
export const studentDeleteImageSchema = z.object({
  id: z.string().min(1, "Image ID is required"),
});

// Render fields for creating student images
export const studentImageCreateRenderFields = [
  {
    name: "student_id",
    label: "Student ID",
    type: "text",
    placeholder: "Enter student ID",
    required: true,
  },
  {
    name: "images",
    label: "Student Images",
    type: "file",
    required: true,
    multiple: true,
    accept: "image/*",
  },
];

// Render fields for deleting student images
export const studentImageDeleteRenderFields = [
  {
    name: "id",
    label: "Image ID",
    type: "hidden",
  },
];
