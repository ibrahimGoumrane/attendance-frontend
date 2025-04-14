import { getAllTeachers } from "@/lib/services/teachers";
import { AddTeacherDialog } from "@/components/admin/dialogs/TeacherDialogs";
import TeacherGrid from "@/components/admin/display/TeacherGrid";
import { getAllDepartments } from "@/lib/services/departments";
import { DepartmentProvider } from "@/lib/contexts/DepartmentContext";
import { TeacherProvider } from "@/lib/contexts/TeacherContext";

export default async function Teachers() {
  const teachers = await getAllTeachers();
  const departments = await getAllDepartments();

  return (
    <DepartmentProvider initialDepartments={departments}>
      <TeacherProvider initialTeachers={teachers}>
        <>
          <h1 className="font-bold text-2xl flex items-center gap-2">
            Teachers <AddTeacherDialog />
          </h1>
          <TeacherGrid />
        </>
      </TeacherProvider>
    </DepartmentProvider>
  );
}
