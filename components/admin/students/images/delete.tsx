"use client";

import BaseForm from "@/components/form/base-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteStudentImage } from "@/lib/actions/studentImages";

import {
  studentImageDeleteRenderFields,
  studentDeleteImageSchema,
} from "@/lib/schemas/student-images";

interface DeleteProps {
  id: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const DeleteStudentImage = ({ id, open, setIsOpen }: DeleteProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            student image and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            className=""
            action={deleteStudentImage}
            schema={studentDeleteImageSchema}
            fields={studentImageDeleteRenderFields}
            defaultValues={{ id }}
            actionType="delete"
            submitText={
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                type="submit"
              >
                Delete
              </AlertDialogAction>
            }
            loadingText={
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                disabled
              >
                Deleting...
              </AlertDialogAction>
            }
            cancelText={
              <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
                Cancel
              </AlertDialogCancel>
            }
            handleCancel={() => setIsOpen(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudentImage;
