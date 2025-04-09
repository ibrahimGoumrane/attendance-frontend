"use client";


import { Button } from "@/components/ui/button";


import { departmentFormSchema } from "@/lib/schemas/departments";

import { addDepartment } from "@/lib/services/departments";
import { Department } from "@/lib/types/api";
import GenericFormDialog from "./GenericFormDialog";
import AddDepartmentForm from "./AddDepartmentForm";

export default function AddDepartmentDialog({
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
      defaultValues={{name: '', description: ''}}
      addAction={addDepartment}
      onSuccess={onDepartmentAdded}
      schema={departmentFormSchema}
      formComponent={(form) => <AddDepartmentForm form={form}/>}
    />
  );
}
