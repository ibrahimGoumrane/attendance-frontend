import { Suspense } from "react";
import { SubjectsTableSkeleton } from "@/components/teacher/subjects/subject-table-skeleton";
import SubjectList from "@/components/teacher/subjects/list";
import { getAllTeachers, getTeacherSubjects } from "@/lib/services/teachers";
import { getAllClasses } from "@/lib/services/classes";
import { getLoggedInUser } from "@/lib/services/users";

export const metadata = {
  title: "Subjects | Teacher Dashboard",
  description: "Manage subjects in your educational institution",
};

export default async function SubjectsPage() {
  const user = await getLoggedInUser();
  if (!user) {
    return <div>Please log in to view your subjects.</div>;
  }
  const teachers = await getAllTeachers();
  const loggedInTeacher = teachers.find(teacher => teacher.user.id === user.id);
  if (!loggedInTeacher) {
    return <div>You are not assigned as a teacher.</div>;
  }
  const teacher_subjects = await getTeacherSubjects(loggedInTeacher.id);
  const classes = await getAllClasses();

  return (
    <Suspense fallback={<SubjectsTableSkeleton />}>
      <SubjectList teacher_subjects={teacher_subjects} teacher={loggedInTeacher} classes={classes} />
    </Suspense>
  );
}
