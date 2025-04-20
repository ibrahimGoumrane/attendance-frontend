import { Student } from "@/lib/types/api";
import { DeleteStudentDialog } from "../dialogs/StudentDialogs";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function StudentCard({ student }: { student: Student }) {
  return (
    <Card className="flex flex-col items-center">
      <CardTitle className="text-xl flex items-center gap-2">
        {student.user.firstName + " " + student.user.lastName}
        <DeleteStudentDialog student={student} />
      </CardTitle>
      <Image alt="Student image" width={225} height={225} src={"/student_placeholder.jpg"}></Image>
    </Card>
  );
}
