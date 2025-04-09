import GenericDeleteDialog from "./GenericDeleteDialog";
import { deleteTeacher } from "@/lib/services/teachers";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Teacher } from "@/lib/types/api";

export default function DeleteTeacherDialog({
  teacher,
  onTeacherDeleted,
}: {
  teacher: Teacher;
  onTeacherDeleted: (id: string) => void;
}) {
  return (
    <GenericDeleteDialog
      trigger={
        <Button
          className="border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white size-8 p-0"
          variant="outline"
          size="icon"
        >
          <Trash className="size-4" />
        </Button>
      }
      title={`Delete ${
        teacher.user.firstName + " " + teacher.user.lastName
      }'s account?`}
      deleteAction={deleteTeacher}
      id={teacher.id}
      onSuccess={onTeacherDeleted}
    />
  );
}
