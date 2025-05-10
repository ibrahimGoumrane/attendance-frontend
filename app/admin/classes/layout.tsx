
import { ClassProvider } from "@/lib/contexts/ClassContext";
import { getAllClassesWithStudentCount } from "@/lib/services/classes";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes = await getAllClassesWithStudentCount();
  console.log(classes);
  return (
    <div>
      <ClassProvider initialClasses={classes}>{children}</ClassProvider>
    </div>
  );
}

