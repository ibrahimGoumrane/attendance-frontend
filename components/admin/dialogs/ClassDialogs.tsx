"use client";

import GenericFormDialog from "@/components/GenericFormDialog";
import { Button } from "@/components/ui/button";
import { classFormSchema } from "@/lib/schemas/classes";

import AddClassForm from "../forms/AddClassForm";
import { addClass } from "@/lib/services/classes";
import { useClassContext } from "@/lib/contexts/ClassContext";

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
