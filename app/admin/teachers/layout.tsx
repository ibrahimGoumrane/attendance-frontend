import { DepartmentProvider } from "@/lib/contexts/DepartmentContext";
import { TeacherProvider } from "@/lib/contexts/TeacherContext";
import { getAllDepartments } from "@/lib/services/departments";
import { getAllTeachers } from "@/lib/services/teachers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTeachers = await getAllTeachers();
  const initialDepartments = await getAllDepartments();
  return (
    <div>
      <TeacherProvider initialTeachers={initialTeachers}>
        <DepartmentProvider initialDepartments={initialDepartments}>
          {children}
        </DepartmentProvider>
      </TeacherProvider>
    </div>
  );
}
