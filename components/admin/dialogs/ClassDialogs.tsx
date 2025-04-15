"use client";

import GenericFormDialog from "@/components/GenericFormDialog";
import { Button } from "@/components/ui/button";
import { classFormSchema } from "@/lib/schemas/classes";

import AddClassForm from "../forms/AddClassForm";
import { addClass, deleteClass, editClass } from "@/lib/services/classes";
import { useClassContext } from "@/lib/contexts/ClassContext";
import { Class } from "@/lib/types/api";
import { Pencil, Trash } from "lucide-react";
import GenericDeleteDialog from "@/components/GenericDeleteDialog";
import { useRouter } from "next/navigation";

export function AddClassDialog() {
  const { addItem } = useClassContext();
  return (
    <GenericFormDialog
      trigger={
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Class"
      description="Enter class name"
      defaultValues={{ name: "" }}
      schema={classFormSchema}
      onSuccess={addItem}
      addAction={addClass}
      formComponent={(form) => <AddClassForm form={form} />}
    />
  );
}

export function EditClassDialog({ cls }: { cls: Class }) {
  const router = useRouter();
  return (
    <GenericFormDialog
      trigger={
        <Button className="size-6 p-0" variant="outline" size="icon">
          <Pencil className="size-4" />
        </Button>
      }
      title={`Edit class ${cls.name}`}
      description="Input new data"
      defaultValues={{ name: cls.name }}
      schema={classFormSchema}
      editAction={editClass}
      id={cls.id}
      formComponent={(form) => <AddClassForm form={form} />}
      onSuccess={() => router.refresh()}
    />
  );
}

export function DeleteClassDialog({ cls }: { cls: Class }) {
  const router = useRouter();
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
      title={`Delete ${cls.name}?`}
      description={
        <>
          This action cannot be undone.
          <span className="text-red-500 font-bold">
            This will also delete all associated student accounts.
          </span>
        </>
      }
      deleteAction={deleteClass}
      id={cls.id}
      onSuccess={() => router.push("/admin/classes")}
    />
  );
}
