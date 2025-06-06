"use server";

import { getAllClasses } from "@/lib/services/classes";
import ListClasses from "@/components/teacher/classes/list";
export default async function ClassesPage() {
  const classes = await getAllClasses();
  return <ListClasses classes={classes} />;
}
