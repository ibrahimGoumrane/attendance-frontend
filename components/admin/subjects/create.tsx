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
import { FieldConfig } from "@/lib/schemas/base";
import {
  CreateSubjectSchema,
  subjectCreateRenderFields,
} from "@/lib/schemas/subjects";
import { Class } from "@/lib/types/class";
import { Teacher } from "@/lib/types/teacher";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
  teachers: Teacher[];
  classes: Class[];
}

const CreateSubjectForm = ({ children, teachers, classes }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const updatedSubjectFields: FieldConfig[] = subjectCreateRenderFields.map(
    (field) => {
      if (field.name === "teacher_id") {
        return {
          ...field,
          options: [
            ...teachers.map((teacher) => ({
              value: teacher.id,
              label: `${teacher.user.firstName} ${teacher.user.lastName}`,
            })),
          ],
        };
      }
      if (field.name === "section_promo_id") {
        return {
          ...field,
          options: [
            ...classes.map((cls) => ({
              value: cls.id,
              label: cls.name,
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
          <DialogTitle>Create Subject</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new subject.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={addSubject}
          schema={CreateSubjectSchema}
          fields={updatedSubjectFields}
          submitText="Create Subject"
          loadingText="Creating Subject..."
          onSuccess={() => {
            setOpen(false);
            router.push("/admin/subjects");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubjectForm;
