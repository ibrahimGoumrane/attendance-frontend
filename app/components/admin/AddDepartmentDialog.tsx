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
import { addDepartment } from "@/lib/services/departments";
import { Department } from "@/lib/types/api";

export default function AddDepartmentDialog({
  onDepartmentAdded,
}: {
  onDepartmentAdded: (arg: Department) => void;
}) {
  const form = useForm<z.infer<typeof departmentFormSchema>>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      description: "",
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
    const response = await addDepartment(values);
    console.log(response);
    if (response.success) {
      onDepartmentAdded(response.data);
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
        <Button size="sm" className="ml-auto text-xs" variant="outline">
          Add New
        </Button>
      }
      title="Add New Department"
      description={
        <>
          Create a new department{" "}
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
