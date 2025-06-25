"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addStudentImage } from "@/lib/actions/studentImages";
import { FieldConfig } from "@/lib/schemas/base";
import {
  studentCreateImageSchema,
  studentImageCreateRenderFields,
} from "@/lib/schemas/student-images";
import { Student } from "@/lib/types/student";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  students: Student[];
  student: Student;
}

const CreateStudentImageForm = ({ children, students, student }: FormProps) => {
  const [open, setOpen] = useState(false);
  const initialValues: Record<string, string> = {
    student_id: student ? student.id : "",
  };
  const updatedImageFields: FieldConfig[] = studentImageCreateRenderFields.map(
    (field) => {
      if (field.name === "student_id") {
        if (student) {
          return {
            ...field,
            type: "hidden",
          };
        }
        return {
          ...field,
          type: "select",
          options: [
            ...students.map((student) => ({
              value: student.id,
              label: `${student.user.firstName} ${student.user.lastName}`,
            })),
          ],
        };
      }
      return field;
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Student Images</DialogTitle>
          <DialogDescription>
            Upload images for a student. You can upload multiple images at once.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={addStudentImage}
          schema={studentCreateImageSchema}
          fields={updatedImageFields}
          submitText="Upload Images"
          loadingText="Uploading Images..."
          onSuccess={() => {
            setOpen(false);
            console.log("Image uploaded successfully");
            // router.refresh();
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentImageForm;
