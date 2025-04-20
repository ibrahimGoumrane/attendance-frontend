import Image from "next/image";
import { getClassById } from "@/lib/services/classes";
import { getStudentById, getStudentImages } from "@/lib/services/students";
import { storageUrl } from "@/lib/utils";

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
    <>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        {cls.name} / {student.user.firstName} {student.user.lastName}
      </h1>
      <h2 className="text-xl">{student.user.firstName}&apos;s images</h2>
      <div className="mt-4 flex gap-2 flex-wrap">
        {studentImages.map((image) => (
          <Image
            width={300}
            height={300}
            className="w-48 rounded-md"
            src={storageUrl(image.image)}
            key={image.id}
            alt=""
          />
        ))}
      </div>
    </>
  );
}
