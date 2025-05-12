"use client";
import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editTeacher } from "@/lib/actions/teacher";
import { FieldConfig } from "@/lib/schemas/base";
import {
  teacherUpdateRenderFields,
  UpdateTeacherSchema,
} from "@/lib/schemas/teachers";
import { Department } from "@/lib/types/department";
import { Teacher } from "@/lib/types/teacher";
import { useRouter } from "next/navigation";
interface FormProps {
  teacher: Teacher;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
  departments: Department[];
}

const UpdateForm = ({ teacher, open, setIsOpen, departments }: FormProps) => {
  const router = useRouter();
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
    <Dialog open={open} onOpenChange={setIsOpen}>
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
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push(`/admin/teachers/${teacher.id}`);
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
