"use client";

import { Button } from "@/components/ui/button";

import { departmentFormSchema } from "@/lib/schemas/departments";

import { editDepartment } from "@/lib/services/departments";
import { Department } from "@/lib/types/api";
import GenericFormDialog from "./GenericFormDialog";
import AddDepartmentForm from "./AddDepartmentForm";
import { Pencil } from "lucide-react";

export default function EditDepartmentDialog({
  department,
  onDepartmentEdited,
}: {
  department: Department;
  onDepartmentEdited: (arg: Department) => void;
}) {
  return (
    <GenericFormDialog
      trigger={
        <Button
        className="size-6 p-0"
        variant="outline"
        size="icon"
      >
        <Pencil className="size-4" />
      </Button>
      }
      title="Add New Department"
      description="Input new data"
      defaultValues={{ name: "", description: "" }}
      editAction={editDepartment}
      id={department.id}
      onSuccess={onDepartmentEdited}
      schema={departmentFormSchema}
      formComponent={(form) => <AddDepartmentForm form={form} />}
    />
  );
}
