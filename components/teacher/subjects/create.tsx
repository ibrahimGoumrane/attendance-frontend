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
import { addSubject } from "@/lib/actions/subject";
import { FieldConfig, State } from "@/lib/schemas/base";
import { CreateSubjectSchema, subjectCreateRenderFields } from "@/lib/schemas/subjects";
import { Class } from "@/lib/types/class";
import { Teacher } from "@/lib/types/teacher";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  teacher: Teacher;
  classes: Class[];
}

const CreateSubjectForm = ({ children, teacher, classes }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const updatedSubjectFields: FieldConfig[] = subjectCreateRenderFields
    .filter(field => field.name !== "teacher_id") // Remove teacher_id field
    .map(field => {
      if (field.name === "section_promo_id") {
        return {
          ...field,
          options: [
            ...classes.map(cls => ({
              value: cls.id,
              label: cls.name,
            })),
          ],
        };
      }
      return field;
    });

  // Custom action to include teacher_id and role
  const handleAddSubject = async (prevState: State, formData: FormData) => {
    formData.append("teacher_id", teacher.id); // Automatically add teacher_id
    return addSubject(prevState, formData, "teacher"); // Pass "teacher" role
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Subject</DialogTitle>
          <DialogDescription>Fill in the details to create a new subject.</DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={handleAddSubject}
          schema={CreateSubjectSchema}
          fields={updatedSubjectFields}
          submitText="Create Subject"
          loadingText="Creating Subject..."
          onSuccess={() => {
            setOpen(false);
            router.push("/teacher/subjects");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectForm;
