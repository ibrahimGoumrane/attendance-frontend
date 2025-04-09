"use client";

import { Button } from "@/components/ui/button";
import {
  teacherFormSchema,
  editTeacherFormSchema,
} from "@/lib/schemas/teachers";
import { Department, Teacher } from "@/lib/types/api";
import EditTeacherForm from "./EditTeacherForm";
import {
  addTeacher,
  editTeacher,
  deleteTeacher,
} from "@/lib/services/teachers";
import GenericFormDialog from "./GenericFormDialog";

import GenericDeleteDialog from "./GenericDeleteDialog";
import AddTeacherForm from "./AddTeacherForm";

import { Trash, Pencil } from "lucide-react";

export function AddTeacherDialog({
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
      formComponent={(form) => (
        <AddTeacherForm departments={departments} form={form} />
      )}
    />
  );
}

export function EditTeacherDialog({
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

export function DeleteTeacherDialog({
  teacher,
  onTeacherDeleted,
}: {
  teacher: Teacher;
  onTeacherDeleted: (id: string) => void;
}) {
  return (
    <GenericDeleteDialog
      trigger={
        <Button
          className="border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white size-8 p-0"
          variant="outline"
          size="icon"
        >
          <Trash className="size-4" />
        </Button>
      }
      title={`Delete ${
        teacher.user.firstName + " " + teacher.user.lastName
      }'s account?`}
      deleteAction={deleteTeacher}
      id={teacher.id}
      onSuccess={onTeacherDeleted}
    />
  );
}
