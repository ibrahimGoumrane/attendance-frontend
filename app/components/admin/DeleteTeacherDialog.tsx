import { Button } from "@/components/ui/button";
import AppDialog from "../AppDialog";
import { Trash } from "lucide-react";
import { Teacher } from "@/lib/types/api";
import { DialogClose } from "@radix-ui/react-dialog";
import { deleteTeacher } from "@/lib/services/teachers";
import { useState } from "react";

export default function DeleteTeacherDialog({
  teacher,
  onTeacherDeleted,
}: {
  teacher: Teacher;
  onTeacherDeleted: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const onDelete = async () => {
    setPending(true);
    const deleted = await deleteTeacher(teacher.id);
    if (deleted) {
      onTeacherDeleted(teacher.id);
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
          className="border-red-500 text-red-500 bg-white hover:bg-red-500 hover:text-white size-8 p-0"
          variant="outline"
          size="icon"
        >
          <Trash className="size-4" />
        </Button>
      }
      title={`Delete ${
        teacher.user.firstName + " " + teacher.user.lastName
      }'s account?`}
      description={"This action cannot be undone."}
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
