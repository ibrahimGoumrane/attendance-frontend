"use client";
import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { editClass } from "@/lib/actions/class";
import {
  classUpdateRenderFields,
  UpdateClassSchema,
} from "@/lib/schemas/classes";
import { Class } from "@/lib/types/class";
import { useRouter } from "next/navigation";
interface FormProps {
  classData: Class;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateForm = ({ classData, open, setIsOpen }: FormProps) => {
  const router = useRouter();
  const initialValues = {
    id: classData.id,
    name: classData.name,
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogDescription>
            Update the class&apos;s information and save changes.
            <span className="text-muted-foreground dark:text-gray-400">
              Please ensure that all fields are filled out correctly.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          className=" "
          action={editClass}
          schema={UpdateClassSchema}
          fields={classUpdateRenderFields}
          submitText="Update Class"
          loadingText="Updating Class..."
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push(`/admin/classes/${classData.id}`);
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
