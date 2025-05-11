"use client";
import BaseForm from "@/components/form/base-form";
import PasswordField from "@/components/form/password-field";
import { addTeacher } from "@/lib/actions/teacher";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";
import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import { FieldConfig, State } from "@/lib/schemas/base";
import {
  CreateTeacherSchema,
  teachercreateRenderFields,
} from "@/lib/schemas/teachers";
import { Teacher } from "@/lib/types/teacher";
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
interface FormProps {
  children: React.ReactNode;
}

const CreateForm = ({ children }: FormProps) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { items: departments } = useDepartmentContext();
  const { addItem } = useTeacherContext();
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const updatedTeacherFields: FieldConfig[] = teachercreateRenderFields.map(
    (field) => {
      if (field.name === "password") {
        return {
          ...field,
          type: showPassword ? "text" : "password",
          customRender: (form: UseFormReturn, state: State) => (
            <PasswordField
              form={form}
              state={state}
              showPassword={showPassword}
              fieldConfig={field}
              handlePasswordVisibility={togglePasswordVisibility}
            />
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
          onSuccess={(data) => {
            addItem(data as Teacher);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
