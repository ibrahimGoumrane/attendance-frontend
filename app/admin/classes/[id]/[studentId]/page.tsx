import { getClassById } from "@/lib/services/classes";
import { getStudentById, getStudentImages } from "@/lib/services/students";
import { AddStudentImageDialog } from "@/components/admin/dialogs/StudentDialogs";
import { StudentImageProvider } from "@/lib/contexts/StudentImageContext";
import StudentImageGrid from "@/components/admin/display/StudentImageGrid";

interface StudentPageProps {
  params: Promise<{ id: string; studentId: string }>;
}

export default async function StudentPage({ params }: StudentPageProps) {
  const classId = (await params).id;
  const studentId = (await params).studentId;
  const cls = await getClassById(classId);
  const student = await getStudentById(studentId);
  const studentImages = await getStudentImages(studentId);
  console.log(studentImages);
  return (
    <StudentImageProvider initialStudentImages={studentImages}>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        {cls.name} / {student.user.firstName} {student.user.lastName}
      </h1>
      <h2 className="text-xl flex items-center">
        {student.user.firstName}&apos;s images{" "}
        <AddStudentImageDialog student={student} />
      </h2>
      <div className="mt-4 flex gap-2 flex-wrap">
        <StudentImageGrid />
      </div>
    </StudentImageProvider>
  );
}
