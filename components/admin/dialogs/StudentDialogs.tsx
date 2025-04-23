"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import GenericDeleteDialog from "../../GenericDeleteDialog";

import { addStudentImage, deleteStudent } from "@/lib/services/students";
import { Student } from "@/lib/types/api";
import { useStudentContext } from "@/lib/contexts/StudentContext";
import GenericFormDialog from "@/components/GenericFormDialog";
import AddStudentImageForm from "../forms/AddStudentImageForm";
import { studentImageFormSchema } from "@/lib/schemas/students";

export function AddStudentImageDialog( {student} : {student: Student}) {
  return (
    <GenericFormDialog
      title={`Add new image for ${student.user.firstName}`}
      description="Choose an image file"
      formComponent={(form) => <AddStudentImageForm form={form} />}
      trigger={
        <Button className="ml-auto mr-4" variant={"outline"}>
          Add Image
        </Button>
      }
      schema={studentImageFormSchema}
      editAction={addStudentImage}
      id={student.id}
      onSuccess={(data) => console.log(data)}
      // Just to ignore typescript as you are not allowed to call FileList constructor
      defaultValues={{images: undefined}}
    />
  );
}

export function DeleteStudentDialog({ student }: { student: Student }) {
  const { deleteItem } = useStudentContext();

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
      title={`Delete ${student.user.firstName} ${student.user.lastName}'s account?`}
      description={<>This action cannot be undone.</>}
      deleteAction={deleteStudent}
      id={student.id}
      onSuccess={deleteItem}
    />
  );
}
