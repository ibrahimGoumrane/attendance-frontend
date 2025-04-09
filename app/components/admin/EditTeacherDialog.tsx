"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Department, Teacher } from "@/lib/types/api";
import EditTeacherForm from "./EditTeacherForm";
import { editTeacher } from "@/lib/services/teachers";
import GenericFormDialog from "./GenericFormDialog";
import { editTeacherFormSchema } from "@/lib/schemas/teachers";

export default function EditTeacherDialog({
  teacher,
  onTeacherEdited,
  departments,
}: {
  teacher: Teacher;
  departments: Department[];
  onTeacherEdited: (teacher: Teacher) => void;
}) {
  return (
    <GenericFormDialog
      trigger={
        <Button
          className="cursor-pointer mr-2 border-1 rounded-sm size-8 p-0"
          variant={"ghost"}
          size={"icon"}
        >
          <Pencil className="size-4" />
        </Button>
      }
      title={`Edit ${
        teacher.user.firstName + " " + teacher.user.lastName
      }'s account`}
      description="Input new data"
      defaultValues={{
        firstName: teacher.user.firstName,
        lastName: teacher.user.lastName,
        email: teacher.user.email,
        department: teacher.department.toString(),
      }}
      editAction={editTeacher}
      id={teacher.id}
      onSuccess={onTeacherEdited}
      schema={editTeacherFormSchema}
      formComponent={(form) => (
        <EditTeacherForm form={form} departments={departments} />
      )}
    />
  );
}
