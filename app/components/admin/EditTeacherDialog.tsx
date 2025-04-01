"use client";

import { Button } from "@/components/ui/button";
import AppDialog from "../AppDialog";
import { Pencil } from "lucide-react";
import { Teacher } from "@/lib/types/api";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import {
  EditTeacherFormErrors,
  editTeacherFormSchema,
} from "@/lib/schemas/teachers";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EditTeacherForm from "./EditTeacherForm";
import { editTeacher } from "@/lib/services/teachers";
import { useState } from "react";

export default function EditTeacherDialog({
  teacher,
  onTeacherEdited,
}: {
  teacher: Teacher;
  onTeacherEdited: (teacher: Teacher) => void;
}) {
  const form = useForm<z.infer<typeof editTeacherFormSchema>>({
    resolver: zodResolver(editTeacherFormSchema),
    defaultValues: {
      firstName: teacher.user.firstName,
      lastName: teacher.user.lastName,
      department: teacher.department,
      email: teacher.user.email,
    },
  });

  const [open, setOpen] = useState(false);

  const setErrorsFromObject = (errorObject: EditTeacherFormErrors) => {
    Object.entries(errorObject).forEach(([key, message]) => {
      form.setError(key as keyof EditTeacherFormErrors, {
        type: "manual",
        message,
      });
    });
  };
  const onSubmit = async (values: z.infer<typeof editTeacherFormSchema>) => {
    const response = await editTeacher(teacher.id, values);
    console.log(response);
    if (response.success) {
      onTeacherEdited(response.data);
      setOpen(false);
    } else {
      console.log("aaaa");
      console.log(response.errors);
      setErrorsFromObject(response.errors);
    }
  };

  const pending = form.formState.isSubmitting;
  const globalError = form.formState.errors.root;

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
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
      description={
        <>
          Input new data
          {globalError && (
            <p className="text-red-500 text-sm"> {globalError.message}</p>
          )}
        </>
      }
      content={<EditTeacherForm form={form} />}
      footer={
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={pending} onClick={form.handleSubmit(onSubmit)}>
            Save
          </Button>
        </div>
      }
    />
  );
}
