"use client";

import { useState } from "react";
import AppDialog from "./AppDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

interface DeleteDialogProps {
  title: string;
  description?: string | React.ReactNode;
  trigger: React.ReactNode;
  deleteAction: (id: string) => Promise<boolean>;
  id: string;
  onSuccess?: (id: string) => void;
}

export default function DeleteDialog({
  title,
  description = "This action cannot be undone.",
  trigger,
  deleteAction,
  id,
  onSuccess,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    const success = await deleteAction(id);
    if (success) {
      if (onSuccess) {
        onSuccess(id);
      }
      setOpen(false);
    } else {
      // Graceful error handling could be added here
      console.error("Delete failed.");
    }
    setPending(false);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      title={title}
      description={description}
      footer={
        <>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={pending}
          >
            Confirm
          </Button>
        </>
      }
    />
  );
}
