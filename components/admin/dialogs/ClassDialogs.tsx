"use client"

import GenericFormDialog from "@/components/GenericFormDialog";
import { Button } from "@/components/ui/button";
import { classFormSchema } from "@/lib/schemas/classes";
import { Class } from "@/lib/types/api";
import AddClassForm from "../forms/AddClassForm";
import { addClass } from "@/lib/services/classes";

export function AddClassDialog({
  onClassAdded,
}: {
  onClassAdded: (cls: Class) => void;
}) {
  return (
    <GenericFormDialog
      trigger={
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Class"
      description="Enter class name"
      defaultValues={{name: ""}}
      schema={classFormSchema}
      onSuccess={onClassAdded}
      addAction={addClass}
      formComponent={(form) => <AddClassForm form={form}/>}
    />
  );
}
