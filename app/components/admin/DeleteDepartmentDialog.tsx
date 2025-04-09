import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Department } from "@/lib/types/api";
import { deleteDepartment } from "@/lib/services/departments";
import GenericDeleteDialog from "./GenericDeleteDialog";

export default function DeleteDepartmentDialog({
  department,
  onDepartmentDeleted,
}: {
  department: Department;
  onDepartmentDeleted: (id: string) => void;
}) {
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
      title={`Delete ${department.name}?`}
      description={
        <>
          This action cannot be undone.
          <span className="text-red-500 font-bold">
            This will also delete all department teacher accounts.
          </span>
        </>
      }
      deleteAction={deleteDepartment}
      id={department.id}
      onSuccess={onDepartmentDeleted}
    />
  );
}
