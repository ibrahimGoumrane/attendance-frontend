"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editStudent } from "@/lib/actions/student";
import {
  updateStudentSchema,
  studentUpdateRenderFields,
} from "@/lib/schemas/students";
import { FieldConfig } from "@/lib/schemas/base";
import { Student } from "@/lib/types/student";
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";

interface FormProps {
  studentData: Student;
  classes: Class[];
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateStudentForm = ({ studentData, classes, open, setIsOpen }: FormProps) => {
  const router = useRouter();

  const initialValues = {
    id: studentData.id,
    firstName: studentData.user.firstName,
    lastName: studentData.user.lastName,
    email: studentData.user.email,
    section_promo: studentData.section_promo,
  };

  const updatedStudentFields: FieldConfig[] = studentUpdateRenderFields.map((field) => {
    if (field.type === "select") {
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
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Update the student&apos;s information and save changes.
            <span className="text-muted-foreground dark:text-gray-400">
              Please ensure that all fields are filled out correctly.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={editStudent}
          schema={updateStudentSchema}
          fields={updatedStudentFields}
          submitText="Update Student"
          loadingText="Updating Student..."
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push("/admin/students");
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStudentForm;
