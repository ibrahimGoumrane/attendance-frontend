"use client";

import { Button } from "@/components/ui/button";

import { departmentFormSchema } from "@/lib/schemas/departments";

import {
  addDepartment,
  deleteDepartment,
  editDepartment,
} from "@/lib/services/departments";
import { Department } from "@/lib/types/api";
import GenericFormDialog from "./GenericFormDialog";
import GenericDeleteDialog from "./GenericDeleteDialog";
import AddDepartmentForm from "./AddDepartmentForm";

import { Pencil, Trash } from "lucide-react";


export function AddDepartmentDialog({
  onDepartmentAdded,
}: {
  onDepartmentAdded: (arg: Department) => void;
}) {
  return (
    <GenericFormDialog
      trigger={
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Department"
      description="Input new data"
      defaultValues={{ name: "", description: "" }}
      addAction={addDepartment}
      onSuccess={onDepartmentAdded}
      schema={departmentFormSchema}
      formComponent={(form) => <AddDepartmentForm form={form} />}
    />
  );
}

export function EditDepartmentDialog({
  department,
  onDepartmentEdited,
}: {
  department: Department;
  onDepartmentEdited: (arg: Department) => void;
}) {
  return (
    <GenericFormDialog
      trigger={
        <Button className="size-6 p-0" variant="outline" size="icon">
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

export function DeleteDepartmentDialog({
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
