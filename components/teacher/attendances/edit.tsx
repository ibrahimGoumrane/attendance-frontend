"use client";

import BaseForm from "@/components/form/base-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { editAttendance } from "@/lib/actions/attendance";
import { UpdateAttendanceSchema, attendanceUpdateRenderFields } from "@/lib/schemas/attendances";
import { Attendance } from "@/lib/types/attendance";
import { useRouter } from "next/navigation";
import { formatDatetimeLocal } from "@/lib/utils";
import { State } from "@/lib/schemas/base";

interface FormProps {
  attendanceData: Attendance;
  open?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const UpdateAttendanceForm = ({ attendanceData, open, setIsOpen }: FormProps) => {
  const router = useRouter();

  const initialValues = {
    id: attendanceData.id,
    date: formatDatetimeLocal(attendanceData.date),
    status: attendanceData.status,
  };

  const handleEditAttendance = async (prevState: State, formData: FormData) => {
    return editAttendance(prevState, formData, "teacher");
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogDescription>
            Update the attendance record and save changes.
            <span className="text-muted-foreground dark:text-gray-400">
              You can modify the date and attendance status.
            </span>
          </DialogDescription>
        </DialogHeader>
        <BaseForm
          initialState={{ success: false, errors: {} }}
          action={handleEditAttendance}
          schema={UpdateAttendanceSchema}
          fields={attendanceUpdateRenderFields}
          submitText="Update Attendance"
          loadingText="Updating Attendance..."
          onSuccess={() => {
            if (setIsOpen) {
              setIsOpen(false);
            }
            router.push("/teacher/attendances");
          }}
          defaultValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAttendanceForm;
