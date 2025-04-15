/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, z, ZodType } from "zod";
import AppDialog from "./AppDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { ErrorWithRoot } from "@/lib/types/errors";

interface BaseFormDialogProps<T extends ZodType<any, any>> {
  open?: boolean;
  trigger: React.ReactNode;
  title: string;
  description?: string;
  schema: T;
  defaultValues: z.infer<T>;
  onSuccess?: (data: any) => void;
  formComponent: (
    form: ReturnType<typeof useForm<z.infer<T>>>
  ) => React.ReactNode;
}

// This type ensures that if `id` is present, `editAction` must also be provided.
type AddOrEditAction<T extends ZodType<any, any>> =
  | {
      addAction: (
        values: z.infer<T>
      ) => Promise<
        | { success: true; data: any }
        | { success: false; errors: ErrorWithRoot<z.infer<T>> }
      >;
      id?: never; // Ensure that id is not passed when `addAction` is used
      editAction?: never; // Ensure that `editAction` is not passed when `addAction` is used
    }
  | {
      id: string; // id is required for edit actions
      editAction: (
        id: string,
        values: z.infer<T>
      ) => Promise<
        | { success: true; data: any }
        | { success: false; errors: ErrorWithRoot<z.infer<T>> }
      >;
      addAction?: never; // Ensure that `addAction` is not passed when `editAction` is used
    };

type FormDialogProps<T extends ZodType<any, any>> = BaseFormDialogProps<T> &
  AddOrEditAction<T>;

export default function GenericFormDialog<T extends ZodType<any, any>>({
  trigger,
  title,
  description,
  schema,
  defaultValues,
  addAction,
  editAction,
  id,
  onSuccess,
  formComponent,
}: FormDialogProps<T>) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const setErrorsFromObject = (errorObject: ErrorWithRoot<z.infer<T>>) => {
    Object.entries(errorObject).forEach(([key, message]) => {
      form.setError(key as Path<TypeOf<T>> | "root", {
        type: "manual",
        message,
      });
    });
  };

  const handleSubmit = async (values: z.infer<T>) => {
    let response;
    if (id && editAction) {
      response = await editAction(id, values);
    } else if (addAction) {
      response = await addAction(values);
    } else {
      throw new Error(
        "TypeScript safety catch - Neither addAction or editAction were found, should NEVER happen"
      );
    }
    if (response.success) {
      if (onSuccess) {
        onSuccess(response.data);
      }
      setOpen(false);
    } else {
      setErrorsFromObject(response.errors || {});
    }
  };

  const pending = form.formState.isSubmitting;
  const globalError = form.formState.errors.root;

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title={title}
      description={
        <>
          {description}
          {globalError && (
            <p className="text-red-500 text-sm">{globalError.message}</p>
          )}
        </>
      }
      content={formComponent(form)}
      footer={
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={pending} onClick={form.handleSubmit(handleSubmit)}>
            Save
          </Button>
        </div>
      }
    />
  );
}
