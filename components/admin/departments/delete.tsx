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
import { deleteDepartment } from "@/lib/actions/department";

import {
  departmentDeleteRenderFields,
  deleteDepartmentSchema,
} from "@/lib/schemas/department";

interface DeleteProps {
  id: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const DeleteDepartment = ({ id, open, setIsOpen }: DeleteProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the department
            and remove its data from our servers. All associated classes or staff may be affected.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            className=""
            action={deleteDepartment}
            schema={deleteDepartmentSchema}
            fields={departmentDeleteRenderFields}
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

export default DeleteDepartment;
