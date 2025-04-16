"use client";

import { useState } from "react";
import AppDialog from "./AppDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

/**
 * Props for the DeleteDialog component.
 */
interface DeleteDialogProps {
  /**
   * The title of the dialog.
   */
  title: string;

  /**
   * Optional description displayed in the dialog.
   * Defaults to "This action cannot be undone."
   */
  description?: string | React.ReactNode;

  /**
   * The trigger element that opens the dialog.
   */
  trigger: React.ReactNode;

  /**
   * Async function to perform the delete action.
   * Should return true if deletion succeeded, false otherwise.
   */
  deleteAction: (id: string) => Promise<boolean>;

  /**
   * The identifier of the item to delete.
   */
  id: string;

  /**
   * Optional callback triggered after successful deletion.
   */
  onSuccess?: (id: string) => void;
}

/**
 * A dialog component for confirming and executing delete actions.
 * It shows a confirmation dialog and performs an async delete operation when confirmed.
 */
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

  /**
   * Handles the delete confirmation action.
   * Calls the `deleteAction` prop and triggers `onSuccess` if successful.
   */
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
