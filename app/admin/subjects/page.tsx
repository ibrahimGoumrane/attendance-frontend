import { Suspense } from "react";
import { SubjectsTableSkeleton } from "@/components/admin/subjects/subject-table-skeleton";
import SubjectList from "@/components/admin/subjects/list";
import { getAllSubjects } from "@/lib/services/subject";
import { getAllTeachers } from "@/lib/services/teachers";
import { getAllClasses } from "@/lib/services/classes";

export const metadata = {
  title: "Subjects | Admin Dashboard",
  description: "Manage subjects in your educational institution",
};

export default async function SubjectsPage() {
  // Fetch data
  const subjects = await getAllSubjects();
  const teachers = await getAllTeachers();
  const classes = await getAllClasses();

  return (
    <Suspense fallback={<SubjectsTableSkeleton />}>
      <SubjectList subjects={subjects} teachers={teachers} classes={classes} />
    </Suspense>
  );
}
