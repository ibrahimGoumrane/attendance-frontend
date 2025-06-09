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
import { deleteAttendance } from "@/lib/actions/attendance";

import { attendanceDeleteRenderFields, DeleteAttendanceSchema } from "@/lib/schemas/attendances";
import { State } from "@/lib/schemas/base";

interface DeleteProps {
  id: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

const DeleteAttendance = ({ id, open, setIsOpen }: DeleteProps) => {
  const handleDeleteAttendance = async (prevState: State, formData: FormData) => {
    return deleteAttendance(prevState, formData, "teacher");
  };

  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the attendance record and remove the data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <BaseForm
            initialState={{ success: false, errors: {} }}
            className=""
            action={handleDeleteAttendance}
            schema={DeleteAttendanceSchema}
            fields={attendanceDeleteRenderFields}
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

export default DeleteAttendance;
