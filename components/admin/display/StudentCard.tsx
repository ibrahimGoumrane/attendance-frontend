import { Student } from "@/lib/types/api";
import { DeleteStudentDialog } from "../dialogs/StudentDialogs";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { storageUrl } from "@/lib/utils";

export default function StudentCard({ student }: { student: Student }) {
  const imageSrc = student.latest_image ? storageUrl(student.latest_image.image) : "/student_placeholder.jpg"
  return (
    <Link href={`/admin/classes/${student.section_promo}/${student.id}`}>
      <Card className="flex flex-col items-center hover:bg-muted/50 cursor-pointer">
        <CardTitle className="text-xl flex items-center gap-2">
          {student.user.firstName + " " + student.user.lastName}
          <DeleteStudentDialog student={student} />
        </CardTitle>
        <Image alt="Student image" width={225} height={225} src={imageSrc}></Image>
      </Card>
    </Link>
  );
}
