import {
  DeleteClassDialog,
  EditClassDialog,
} from "@/components/admin/dialogs/ClassDialogs";
import StudentGrid from "@/components/admin/display/StudentGrid";
import { getClassById, getClassStudents } from "@/lib/services/classes";

interface ClassPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClassPage({ params }: ClassPageProps) {
  const id = (await params).id;
  const cls = await getClassById(id);
  const students = await getClassStudents(id);
  console.log(cls);
  console.log(students);
  return (
    <>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        {cls.name} <EditClassDialog cls={cls} /> <DeleteClassDialog cls={cls} />
      </h1>
      <StudentGrid students={students} />
    </>
  );
}
