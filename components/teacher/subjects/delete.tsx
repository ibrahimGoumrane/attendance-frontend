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
import { deleteSubject } from "@/lib/actions/subject";
import { State } from "@/lib/schemas/base";

import { subjectDeleteRenderFields, DeleteSubjectSchema } from "@/lib/schemas/subjects";

interface DeleteProps {
  id: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const DeleteSubject = ({ id, open, setIsOpen }: DeleteProps) => {
  // Custom action to handle subject deletion
  const handleDeleteSubject = async (prevState: State, formData: FormData) => {
    return deleteSubject(prevState, formData, "teacher");
  };

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the subject and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            className=""
            action={handleDeleteSubject}
            schema={DeleteSubjectSchema}
            fields={subjectDeleteRenderFields}
            defaultValues={{ id }}
            actionType="delete"
            submitText={
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" type="submit">
                Delete
              </AlertDialogAction>
            }
            loadingText={
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" disabled>
                Deleting...
              </AlertDialogAction>
            }
            cancelText={<AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">Cancel</AlertDialogCancel>}
            handleCancel={() => setIsOpen(false)}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSubject;
