"use server";

import { getAllClassesWithStudentCount } from "@/lib/services/classes";
import ListClasses from "@/components/admin/classes/list";
export default async function ClassesPage() {
  const classes = await getAllClassesWithStudentCount();
  return <ListClasses classes={classes} />;
}
