"use client";

import BaseForm from "@/components/form/base-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { editSubject } from "@/lib/actions/subject";
import { UpdateSubjectSchema, subjectUpdateRenderFields } from "@/lib/schemas/subjects";
import { FieldConfig, State } from "@/lib/schemas/base";
import { Subject } from "@/lib/types/subject";
import { Teacher } from "@/lib/types/teacher";
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";

interface FormProps {
  subjectData: Subject;
  teacher: Teacher;
  classes: Class[];
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateSubjectForm = ({ subjectData, teacher, classes, open, setIsOpen }: FormProps) => {
  const router = useRouter();
  const initialValues = {
    id: subjectData.id,
    name: subjectData.name,
    section_promo_id: subjectData.section_promo.id,
  };

  const updatedSubjectFields: FieldConfig[] = subjectUpdateRenderFields
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
  const handleEditSubject = async (prevState: State, formData: FormData) => {
    formData.set("teacher_id", teacher.id);
    return editSubject(prevState, formData, "teacher"); // Pass "teacher" role
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Subject</DialogTitle>
          <DialogDescription>
            Update the subject&apos;s information and save changes.
            <span className="text-muted-foreground dark:text-gray-400">You can change the subject name and class.</span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={handleEditSubject}
          schema={UpdateSubjectSchema}
          fields={updatedSubjectFields}
          submitText="Update Subject"
          loadingText="Updating Subject..."
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push("/teacher/subjects");
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSubjectForm;
