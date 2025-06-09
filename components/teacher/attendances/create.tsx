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
import { CreateAttendanceSchema, attendanceCreateRenderFields } from "@/lib/schemas/attendances";
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
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const router = useRouter();

  // Filter students based on selected subject's section_promo.id
  const filteredStudents = students.filter(student => {
    const subject = subjects.find(s => s.id == selectedSubjectId);
    return subject ? student.section_promo === subject.section_promo.id : false;
  });

  const updatedAttendanceFields: FieldConfig[] = attendanceCreateRenderFields.map(field => {
    if (field.name === "subject_id") {
      return {
        ...field,
        options: subjects.map(subject => ({
          value: subject.id,
          label: subject.name,
        })),
        onValueChange: (value: string) => setSelectedSubjectId(value),
      };
    }
    if (field.name === "student_id") {
      return {
        ...field,
        options: filteredStudents.map(student => ({
          value: student.id,
          label: `${student.user.firstName} ${student.user.lastName}`,
        })),
        disabled: filteredStudents.length === 0 || !selectedSubjectId,
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
          <DialogDescription>Fill in the details to register a new attendance record.</DialogDescription>
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
            router.push("/teacher/attendances");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateAttendanceForm;
