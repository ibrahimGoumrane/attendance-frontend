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
import { addStudent } from "@/lib/actions/student";
import { FieldConfig } from "@/lib/schemas/base";
import {
  createStudentSchema,
  studentCreateRenderFields,
} from "@/lib/schemas/students";
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  classes: Class[]
}

const CreateStudentForm = ({ children, classes }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const updatedStudentFields: FieldConfig[] = studentCreateRenderFields.map((field) => {
    if (field.type === "select") {
      return {
        ...field,
        options: [
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
          <DialogTitle>Create Student</DialogTitle>
          <DialogDescription>
            Fill in the details to register a new student.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={addStudent}
          schema={createStudentSchema}
          fields={updatedStudentFields}
          submitText="Create Student"
          loadingText="Creating Student..."
          onSuccess={() => {
            setOpen(false);
            router.push("/admin/students");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentForm;
