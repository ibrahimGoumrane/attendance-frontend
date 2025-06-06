import { Suspense } from "react";
import { SubjectsTableSkeleton } from "@/components/teacher/subjects/subject-table-skeleton";
import SubjectList from "@/components/teacher/subjects/list";
import { getTeacherSubjects } from "@/lib/services/teachers";
import { getAllClasses } from "@/lib/services/classes";
import { getLoggedInTeacher } from "@/lib/services/users";

export const metadata = {
  title: "Subjects | Teacher Dashboard",
  description: "Manage subjects in your educational institution",
};

export default async function SubjectsPage() {
  const loggedInTeacher = await getLoggedInTeacher();
  if (!loggedInTeacher) {
    return <div>Please log in to view your subjects.</div>;
  }
  const teacher_subjects = await getTeacherSubjects(loggedInTeacher.id);
  const classes = await getAllClasses();

  return (
    <Suspense fallback={<SubjectsTableSkeleton />}>
      <SubjectList teacher_subjects={teacher_subjects} teacher={loggedInTeacher} classes={classes} />
    </Suspense>
  );
}
