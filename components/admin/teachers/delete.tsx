"use client";

import { useState, cloneElement, ReactElement, ComponentProps } from "react";
import BaseForm from "@/components/form/base-form";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import { deleteTeacher } from "@/lib/actions/teacher";
import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import {
  DeleteTeacherSchema,
  teacherDeleteRenderFields,
} from "@/lib/schemas/teachers";

interface DeleteProps {
  id: string;
  children?: ReactElement<ComponentProps<typeof Button>>;
}

const Delete = ({ id, children }: DeleteProps) => {
  const [open, setOpen] = useState(false);
  const { deleteItem } = useTeacherContext();

  const triggerButton = children ? (
    cloneElement(children, {
      onClick: (e) => {
        setOpen(true);
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    })
  ) : (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => setOpen(true)}
      className="w-full"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      Delete
    </Button>
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {triggerButton}
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
            defaultValues={{ id }}
            actionType="delete"
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
            handleCancel={() => setOpen(false)}
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
