"use client";
import BaseForm from "@/components/form/base-form";
import PasswordField from "@/components/form/password-field";
import { addTeacher } from "@/lib/actions/teacher";
import { FieldConfig, State } from "@/lib/schemas/base";
import {
  CreateTeacherSchema,
  teachercreateRenderFields,
} from "@/lib/schemas/teachers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Department } from "@/lib/types/department";
interface FormProps {
  children: React.ReactNode;
  departments: Department[];
}

const CreateForm = ({ children, departments }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const updatedTeacherFields: FieldConfig[] = teachercreateRenderFields.map(
    (field) => {
      if (field.name === "password") {
        return {
          ...field,
          customRender: (form: UseFormReturn, state: State) => (
            <PasswordField form={form} state={state} fieldConfig={field} />
          ),
        };
      }
      if (field.name === "department") {
        return {
          ...field,
          type: "select",
          options: [
            ...departments.map((dept) => ({
              value: String(dept.id),
              label: dept.name,
            })),
          ],
        };
      }
      return field;
    }
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Teacher</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new teacher account.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          className=" "
          action={addTeacher}
          schema={CreateTeacherSchema}
          fields={updatedTeacherFields}
          submitText="Create Teacher"
          loadingText="Creating Teacher..."
          onSuccess={() => {
            setOpen(false);
            router.push("/admin/teachers");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
