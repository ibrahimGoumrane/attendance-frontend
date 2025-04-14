import { getAllDepartmentsWithTeacherCount } from "@/lib/services/departments";
import DepartmentGrid from "@/components/admin/display/DepartmentGrid";
import { AddDepartmentDialog } from "@/components/admin/dialogs/DepartmentDialogs";
import { DepartmentProvider } from "@/lib/contexts/DepartmentContext";

export default async function Departments() {
  const departments = await getAllDepartmentsWithTeacherCount();
  return (
    <DepartmentProvider initialDepartments={departments}>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        Departments <AddDepartmentDialog />
      </h1>
      <DepartmentGrid />
    </DepartmentProvider>
  );
}
