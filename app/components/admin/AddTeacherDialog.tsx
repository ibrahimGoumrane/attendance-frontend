"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { teacherFormSchema } from "@/lib/schemas/auth";
import AppDialog from "../AppDialog";
import TeacherForm from "./TeacherForm";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { addTeacher } from "@/lib/services/teachers";

export default function AddTeacherDialog() {
  const form = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      department: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof teacherFormSchema>) => {
    const error = await addTeacher(values);
    console.log(error);
  };

  const pending = form.formState.isSubmitting;

  return (
    <AppDialog
      trigger={
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Teacher"
      description="Create a new teacher account"
      content={<TeacherForm form={form} />}
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
