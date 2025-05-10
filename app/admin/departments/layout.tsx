import { DepartmentProvider } from "@/lib/contexts/DepartmentContext";
import { getAllDepartmentsWithTeacherCount } from "@/lib/services/departments";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialDepartments = await getAllDepartmentsWithTeacherCount();
  return (
    <div>
      <DepartmentProvider initialDepartments={initialDepartments}>
        {children}
      </DepartmentProvider>
    </div>
  );
}