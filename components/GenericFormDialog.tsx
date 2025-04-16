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

/**
 * Base props for the generic form dialog.
 * @template T - A Zod schema type used for form validation and inference.
 */
interface BaseFormDialogProps<T extends ZodType<any, any>> {
  /** Whether the dialog is initially open (controlled externally) */
  open?: boolean;
  /** The React node that triggers the dialog when clicked */
  trigger: React.ReactNode;
  /** Dialog title */
  title: string;
  /** Optional dialog description */
  description?: string;
  /** Zod schema used for form validation */
  schema: T;
  /** Default values for the form, inferred from the schema */
  defaultValues: z.infer<T>;
  /** Optional callback invoked when the form submission is successful */
  onSuccess?: (data: any) => void;
  /**
   * A component that renders the form UI.
   * Receives the `useForm` return value.
   */
  formComponent: (
    form: ReturnType<typeof useForm<z.infer<T>>>
  ) => React.ReactNode;
}

/**
 * Conditional props depending on whether the form is in "add" or "edit" mode.
 * Only one of `addAction` or `editAction` should be provided.
 * @template T - A Zod schema type used for form validation and inference.
 */
type AddOrEditAction<T extends ZodType<any, any>> =
  | {
      /**
       * Function called when submitting a new form.
       * Returns either success with data or failure with field-level errors.
       */
      addAction: (
        values: z.infer<T>
      ) => Promise<
        | { success: true; data: any }
        | { success: false; errors: ErrorWithRoot<z.infer<T>> }
      >;
      id?: never;
      editAction?: never;
    }
  | {
      /**
       * ID of the item being edited. Required if `editAction` is provided.
       */
      id: string;
      /**
       * Function called when submitting an edit form.
       * Receives the `id` and the updated form values.
       */
      editAction: (
        id: string,
        values: z.infer<T>
      ) => Promise<
        | { success: true; data: any }
        | { success: false; errors: ErrorWithRoot<z.infer<T>> }
      >;
      addAction?: never;
    };

/**
 * Props for the `GenericFormDialog` component.
 * Combines base props with conditional add/edit actions.
 */
type FormDialogProps<T extends ZodType<any, any>> = BaseFormDialogProps<T> &
  AddOrEditAction<T>;

/**
 * A generic, schema-driven form dialog component that supports both "add" and "edit" workflows.
 *
 * @template T - A Zod schema type used for form validation and default values.
 * @param props - Props used to configure and render the form dialog.
 * @returns A dialog component with form handling logic and validation.
 */
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

  /**
   * Sets form errors based on an object keyed by field names.
   * @param errorObject - Object containing field-level error messages.
   */
  const setErrorsFromObject = (errorObject: ErrorWithRoot<z.infer<T>>) => {
    Object.entries(errorObject).forEach(([key, message]) => {
      form.setError(key as Path<TypeOf<T>> | "root", {
        type: "manual",
        message,
      });
    });
  };

  /**
   * Handles the form submission for both "add" and "edit" actions.
   * @param values - The validated form values.
   */
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
      onSuccess?.(response.data);
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
