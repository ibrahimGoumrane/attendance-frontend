"use client";

import { Button } from "@/components/ui/button";

import { departmentFormSchema } from "@/lib/schemas/departments";

import {
  addDepartment,
  deleteDepartment,
  editDepartment,
} from "@/lib/services/departments";
import { Department } from "@/lib/types/api";
import GenericFormDialog from "../../GenericFormDialog";
import GenericDeleteDialog from "../../GenericDeleteDialog";
import AddDepartmentForm from "../forms/AddDepartmentForm";

import { Pencil, Trash } from "lucide-react";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";

export function AddDepartmentDialog() {
  const { addItem } = useDepartmentContext();
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
      onSuccess={addItem}
      schema={departmentFormSchema}
      formComponent={(form) => <AddDepartmentForm form={form} />}
    />
  );
}

export function EditDepartmentDialog({
  department,
}: {
  department: Department;
}) {
  const { editItem } = useDepartmentContext();
  return (
    <GenericFormDialog
      trigger={
        <Button className="size-6 p-0" variant="outline" size="icon">
          <Pencil className="size-4" />
        </Button>
      }
      title="Add New Department"
      description="Input new data"
      defaultValues={{
        name: department.name,
        description: department.description,
      }}
      editAction={editDepartment}
      id={department.id}
      onSuccess={(data) => {
        // This is done because after editing, the state is set to the API's return
        // which does NOT contain the teacherCount property
        data.teacherCount = department.teacherCount;
        editItem(data);
      }}
      schema={departmentFormSchema}
      formComponent={(form) => <AddDepartmentForm form={form} />}
    />
  );
}

export function DeleteDepartmentDialog({
  department,
}: {
  department: Department;
}) {
  const { deleteItem } = useDepartmentContext();
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
      onSuccess={deleteItem}
    />
  );
}
