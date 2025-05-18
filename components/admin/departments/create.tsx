"use client";
import BaseForm from "@/components/form/base-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addDepartment } from "@/lib/actions/department";
import {
  departmentCreateRenderFields,
  createDepartmentSchema,
} from "@/lib/schemas/departments";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormProps {
  children: React.ReactNode;
}

const CreateDepartmentForm = ({ children }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new department.
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          className=""
          action={addDepartment}
          schema={createDepartmentSchema}
          fields={departmentCreateRenderFields}
          submitText="Create Department"
          loadingText="Creating Department..."
          onSuccess={() => {
            setOpen(false);
            router.push("/admin/departments");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartmentForm;
