import { Suspense } from "react";

import SubjectDetailsPage from "@/components/teacher/subjects/get";
import { getSubject } from "@/lib/services/subject";
import { getAllTeachers } from "@/lib/services/teachers";
import { getAllClasses } from "@/lib/services/classes";
import { getLoggedInUser } from "@/lib/services/users";

export default async function SubjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = await getLoggedInUser();
  if (!user) {
    return <div>Please log in to view your subjects.</div>;
  }
  const teachers = await getAllTeachers();
  const loggedInTeacher = teachers.find(teacher => teacher.user.id === user.id);
  if (!loggedInTeacher) {
    return <div>You are not assigned as a teacher.</div>;
  }
  const subject = await getSubject(id);
  const classes = await getAllClasses();

  return (
    <Suspense fallback={<div>Loading subject details...</div>}>
      <SubjectDetailsPage
        subject={subject}
        teacher={loggedInTeacher}
        classes={classes}
      />
    </Suspense>
  );
}
