"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherFormErrors, teacherFormSchema } from "@/lib/schemas/teachers";
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

  const setErrorsFromObject = (errorObject: TeacherFormErrors) => {
    Object.entries(errorObject).forEach(([key, message]) => {
      form.setError(key as keyof TeacherFormErrors, {
        type: "manual",
        message,
      });
    });
  };

  const onSubmit = async (values: z.infer<typeof teacherFormSchema>) => {
    const error = await addTeacher(values);
    if (error) {
      setErrorsFromObject(error);
    }
  };

  const pending = form.formState.isSubmitting;
  const globalError = form.formState.errors.root;

  return (
    <AppDialog
      trigger={
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Teacher"
      description={
        <>
          Create a new teacher account
          {globalError && (
            <p className="text-red-500 text-sm"> {globalError.message}</p>
          )}
        </>
      }
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
