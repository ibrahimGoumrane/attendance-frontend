"use client";

import AppDialog from "../AppDialog";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { DeparmentFormErrors, departmentFormSchema } from "@/lib/schemas/departments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DepartmentForm from "./AddDepartmentForm";
import { editDepartment } from "@/lib/services/departments";
import { Department } from "@/lib/types/api";
import { Pencil } from "lucide-react";

export default function EditDepartmentDialog({
  department,
  onDepartmentEdited,
}: {
  department : Department,
  onDepartmentEdited: (arg: Department) => void;
}) {
  const form = useForm<z.infer<typeof departmentFormSchema>>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: department.name,
      description: department.description,
    },
  });

  const [open, setOpen] = useState(false);

  const setErrorsFromObject = (errorObject: DeparmentFormErrors) => {
    Object.entries(errorObject).forEach(([key, message]) => {
      form.setError(key as keyof DeparmentFormErrors, {
        type: "manual",
        message,
      });
    });
  };

  const onSubmit = async (values: z.infer<typeof departmentFormSchema>) => {
    const response = await editDepartment(department.id, values)
    console.log(response);
    if (response.success) {
      onDepartmentEdited({...response.data, teacherCount: department.teacherCount});
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
          className="cursor-pointer mr-2 border-1 rounded-sm size-6 p-0"
          variant={"ghost"}
          size={"icon"}
        >
          <Pencil className="size-4" />
        </Button>
      }
      title={`Edit ${department.name} department`}
      description={
        <>
          Input new data{" "}
          {globalError && (
            <p className="text-red-500 text-sm"> {globalError.message}</p>
          )}
        </>
      }
      content={<DepartmentForm form={form} />}
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
