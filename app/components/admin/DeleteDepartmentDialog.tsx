import { Button } from "@/components/ui/button";
import AppDialog from "../AppDialog";
import { Trash } from "lucide-react";
import { Department } from "@/lib/types/api";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { deleteDepartment } from "@/lib/services/departments";

export default function DeleteDepartmentDialog({
  department,
  onDepartmentDeleted,
}: {
  department: Department;
  onDepartmentDeleted: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const onDelete = async () => {
    setPending(true);
    const deleted = await deleteDepartment(department.id);
    if (deleted) {
      onDepartmentDeleted(department.id);
      setOpen(false);
      setPending(false);
    } else {
      // TODO - Graceful error handling
      console.log("FAILED TO DELETE");
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          className="border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white size-6 p-0"
          variant="outline"
          size="icon"
        >
          <Trash className="size-4" />
        </Button>
      }
      title={`Delete ${department.name}?`}
      description={
        <>
          This action cannot be undone.{" "}
          <span className="text-red-500 font-bold">This
          will also delete all department teacher accounts.</span> 
        </>
      }
      footer={
        <>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button disabled={pending} onClick={onDelete} variant={"destructive"}>
            Confirm
          </Button>
        </>
      }
    />
  );
}
