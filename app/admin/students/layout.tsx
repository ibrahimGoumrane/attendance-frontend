import { ClassProvider } from "@/lib/contexts/ClassContext";
import { StudentProvider } from "@/lib/contexts/StudentContext";
import { getAllClasses } from "@/lib/services/classes";
import { getAllStudents } from "@/lib/services/students";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialStudents = await getAllStudents();
  const initialClasses = await getAllClasses();
  return (
    <div>
      <StudentProvider initialStudents={initialStudents}>
        <ClassProvider initialClasses={initialClasses}>
          {children}
        </ClassProvider>
      </StudentProvider>
    </div>
  );
}
