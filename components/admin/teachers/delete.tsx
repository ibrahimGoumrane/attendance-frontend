"use client";
import BaseForm from "@/components/form/base-form";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTeacher } from "@/lib/actions/teacher";
import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import {
  DeleteTeacherSchema,
  teacherDeleteRenderFields,
} from "@/lib/schemas/teachers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
interface DeleteProps {
  id: string;
}

const Delete = ({ id }: DeleteProps) => {
  const [open, setOpen] = useState(false);
  const { deleteItem } = useTeacherContext();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
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
            submitText={
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            }
            loadingText={
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Deleting...
              </AlertDialogAction>
            }
            cancelText={
              <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300">
                Cancel
              </AlertDialogCancel>
            }
            actionType="delete"
            handleCancel={() => setOpen(false)}
            defaultValues={{ id }}
            onSuccess={() => {
              deleteItem(id);
              setOpen(false);
            }}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
