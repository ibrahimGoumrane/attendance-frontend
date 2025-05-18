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
import { addAttendance } from "@/lib/actions/attendance";
import { FieldConfig } from "@/lib/schemas/base";
import {
  CreateAttendanceSchema,
  attendanceCreateRenderFields,
} from "@/lib/schemas/attendances";
import { Student } from "@/lib/types/student";
import { Subject } from "@/lib/types/subject";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  subjects: Subject[];
  students: Student[];
}

const CreateAttendanceForm = ({ children, subjects, students }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const updatedAttendanceFields: FieldConfig[] =
    attendanceCreateRenderFields.map((field) => {
      if (field.type === "select" && field.name === "subject") {
        return {
          ...field,
          options: [
            { value: "0", label: "Select a subject" },
            ...subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            })),
          ],
        };
      }
      if (field.type === "select" && field.name === "student") {
        return {
          ...field,
          options: [
            { value: "0", label: "Select a student" },
            ...students.map((student) => ({
              value: student.id,
              label: `${student.user.firstName} ${student.user.lastName}`,
            })),
          ],
        };
      }
      return field;
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Attendance</DialogTitle>
          <DialogDescription>
            Fill in the details to register a new attendance record.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={addAttendance}
          schema={CreateAttendanceSchema}
          fields={updatedAttendanceFields}
          submitText="Create Attendance"
          loadingText="Creating Attendance..."
          onSuccess={() => {
            setOpen(false);
            router.push("/admin/attendances");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAttendanceForm;
