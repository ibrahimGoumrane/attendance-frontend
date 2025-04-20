import { Student } from "@/lib/types/api";
import { DeleteStudentDialog } from "../dialogs/StudentDialogs";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function StudentCard({ student }: { student: Student }) {
  return (
    <Link href={`/admin/classes/${student.section_promo}/${student.id}`}>
      <Card className="flex flex-col items-center hover:bg-muted/50 cursor-pointer">
        <CardTitle className="text-xl flex items-center gap-2">
          {student.user.firstName + " " + student.user.lastName}
          <DeleteStudentDialog student={student} />
        </CardTitle>
        <Image alt="Student image" width={225} height={225} src={"/student_placeholder.jpg"}></Image>
      </Card>
    </Link>
  );
}
