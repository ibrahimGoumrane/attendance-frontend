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
import { editTeacher } from "@/lib/actions/teacher";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";
import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import { FieldConfig } from "@/lib/schemas/base";
import {
  teacherUpdateRenderFields,
  UpdateTeacherSchema,
} from "@/lib/schemas/teachers";
import { Teacher } from "@/lib/types/teacher";
import React, { useState } from "react";
interface FormProps {
  teacher: Teacher;
  children: React.ReactNode;
}

const UpdateForm = ({ teacher, children }: FormProps) => {
  const [open, setOpen] = useState(false);
  const { items: departments } = useDepartmentContext();
  const { editItem } = useTeacherContext();
  const initialValues = {
    id: teacher.id,
    firstName: teacher.user.firstName,
    lastName: teacher.user.lastName,
    email: teacher.user.email,
    department: teacher.department,
  };
  const updatedTeacherFields: FieldConfig[] = teacherUpdateRenderFields.map(
    (field) => {
      if (field.name === "department") {
        return {
          ...field,
          type: "select",
          options: departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          })),
        };
      }
      return field;
    }
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        className="w-full flex justify-start"
      >
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Teacher</DialogTitle>
          <DialogDescription>
            Update the teacher&apos;s information and save changes.
            <span className="text-muted-foreground dark:text-gray-400">
              Please ensure that all fields are filled out correctly.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          className=" "
          action={editTeacher}
          schema={UpdateTeacherSchema}
          fields={updatedTeacherFields}
          submitText="Update Teacher"
          loadingText="Updating Teacher..."
          onSuccess={(data) => {
            editItem(data as Teacher);
            setOpen(false);
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
