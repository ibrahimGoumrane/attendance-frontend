"use client";

import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editSubject } from "@/lib/actions/subject";
import {
  UpdateSubjectSchema,
  subjectUpdateRenderFields,
} from "@/lib/schemas/subjects";
import { FieldConfig } from "@/lib/schemas/base";
import { Subject } from "@/lib/types/subject";
import { Teacher } from "@/lib/types/teacher";
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";

interface FormProps {
  subjectData: Subject;
  teachers: Teacher[];
  classes: Class[];
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateSubjectForm = ({
  subjectData,
  teachers,
  classes,
  open,
  setIsOpen,
}: FormProps) => {
  const router = useRouter();
  const initialValues = {
    id: subjectData.id,
    name: subjectData.name,
    teacher_id: subjectData.teacher.id,
    section_promo_id: subjectData.section_promo.id,
  };
  console.log("initialValues", initialValues);

  const updatedSubjectFields: FieldConfig[] = subjectUpdateRenderFields.map(
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
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>
            Update the subject&apos;s information and save changes.
            <span className="text-muted-foreground dark:text-gray-400">
              You can change the subject name, assigned teacher, and class.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={editSubject}
          schema={UpdateSubjectSchema}
          fields={updatedSubjectFields}
          submitText="Update Subject"
          loadingText="Updating Subject..."
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push("/admin/subjects");
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubjectForm;
