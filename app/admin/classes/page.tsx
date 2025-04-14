import { AddClassDialog } from "@/components/admin/dialogs/ClassDialogs";
import ClassGrid from "@/components/admin/display/ClassGrid";
import { getAllClassesWithStudentCount } from "@/lib/services/classes";
import { ClassProvider } from "@/lib/contexts/ClassContext";
import { Class } from "@/lib/types/api";

export default async function Classes() {
  const classes = await getAllClassesWithStudentCount();
  return (
    <ClassProvider initialClasses={classes} >
      <h1 className="font-bold text-2xl flex items-center gap-2">
        Classes <AddClassDialog />
      </h1>

      <ClassGrid initialClasses={classes} />
    </ClassProvider>
  );
}
