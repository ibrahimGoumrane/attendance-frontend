"use client";

import { Button } from "@/components/ui/button";
import { Department, Teacher } from "@/lib/types/api";
import GenericFormDialog from "./GenericFormDialog";
import { teacherFormSchema } from "@/lib/schemas/teachers";
import AddTeacherForm from "./AddTeacherForm";
import { addTeacher } from "@/lib/services/teachers";

export default function AddTeacherDialog({
  onTeacherAdded,
  departments,
}: {
  onTeacherAdded: (arg: Teacher) => void;
  departments: Department[];
}) {
  return (
    <GenericFormDialog
      trigger={
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Teacher"
      description="Input teacher data"
      defaultValues={{
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        department: "",
        email: "",
      }}
      addAction={addTeacher}
      onSuccess={onTeacherAdded}
      schema={teacherFormSchema}
      formComponent={(form) => <AddTeacherForm departments={departments} form={form} />}
    />
  );
}
