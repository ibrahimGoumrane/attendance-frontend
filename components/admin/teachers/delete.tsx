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

import { deleteTeacher } from "@/lib/actions/teacher";
import {
  DeleteTeacherSchema,
  teacherDeleteRenderFields,
} from "@/lib/schemas/teachers";

interface DeleteProps {
  id: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const Delete = ({ id, open, setIsOpen }: DeleteProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            teacher account and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            className=""
            action={deleteTeacher}
            schema={DeleteTeacherSchema}
            fields={teacherDeleteRenderFields}
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

export default Delete;
