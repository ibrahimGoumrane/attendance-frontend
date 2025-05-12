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
import { addClass } from "@/lib/actions/class";
import {
  classCreateRenderFields,
  CreateClassSchema,
} from "@/lib/schemas/classes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
interface FormProps {
  children: React.ReactNode;
}

const CreateForm = ({ children }: FormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
          action={addClass}
          schema={CreateClassSchema}
          fields={classCreateRenderFields}
          submitText="Create Class"
          loadingText="Creating Class..."
          onSuccess={() => {
            setOpen(false);
            router.push("/admin/classes");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
