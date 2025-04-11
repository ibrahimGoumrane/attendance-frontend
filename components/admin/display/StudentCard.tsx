import { Student } from "@/lib/types/api";

export default function StudentCard({ student }: { student: Student }) {
  return (
    <div className="border border-red-300">{student.user.firstName + " " + student.user.lastName}</div>
  );
}
