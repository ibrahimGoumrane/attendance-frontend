"use client";
import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editDepartment } from "@/lib/actions/department";
import {
  departmentUpdateRenderFields,
  updateDepartmentSchema,
} from "@/lib/schemas/department";
import { Department } from "@/lib/types/department";
import { useRouter } from "next/navigation";

interface FormProps {
  departmentData: Department;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateDepartmentForm = ({ departmentData, open, setIsOpen }: FormProps) => {
  const router = useRouter();
  const initialValues = {
    id: departmentData.id,
    name: departmentData.name,
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Department</DialogTitle>
          <DialogDescription>
            Update the department&apos;s information and save changes.
            <span className="text-muted-foreground dark:text-gray-400">
              Please ensure that all fields are filled out correctly.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          className=" "
          action={editDepartment}
          schema={updateDepartmentSchema}
          fields={departmentUpdateRenderFields}
          submitText="Update Department"
          loadingText="Updating Department..."
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push(`/admin/departments/`);
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDepartmentForm;
