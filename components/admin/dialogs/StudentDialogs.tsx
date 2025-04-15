"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import GenericDeleteDialog from "../../GenericDeleteDialog";

import { deleteStudent } from "@/lib/services/students";
import { Student } from "@/lib/types/api";
import { useStudentContext } from "@/lib/contexts/StudentContext";

export function DeleteStudentDialog({ student }: { student: Student }) {
  const { deleteItem } = useStudentContext();

  return (
    <GenericDeleteDialog
      trigger={
        <Button
          className="border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white size-6 p-0"
          variant="outline"
          size="icon"
        >
          <Trash className="size-4" />
        </Button>
      }
      title={`Delete ${student.user.firstName} ${student.user.lastName}'s account?`}
      description={<>This action cannot be undone.</>}
      deleteAction={deleteStudent}
      id={student.id}
      onSuccess={deleteItem}
    />
  );
}
