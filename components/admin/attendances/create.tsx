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
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  classes: Class[];
}

const CreateAttendanceForm = ({ children, classes }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const updatedAttendanceFields: FieldConfig[] =
    attendanceCreateRenderFields.map((field) => {
      if (field.type === "select" && field.name === "classId") {
        return {
          ...field,
          options: [
            { value: "None", label: "Choose a class" },
            ...classes.map((classItem) => ({
              value: classItem.id,
              label: classItem.name,
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
