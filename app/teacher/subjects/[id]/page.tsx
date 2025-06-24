import { Suspense } from "react";

import SubjectDetailsPage from "@/components/teacher/subjects/get";
import { getSubject, getSubjectAttendance } from "@/lib/services/subject";
import { getAllClasses } from "@/lib/services/classes";
import { getLoggedInTeacher } from "@/lib/services/users";

export default async function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loggedInTeacher = await getLoggedInTeacher();
  if (!loggedInTeacher) {
    return <div>Please log in to view your subjects.</div>;
  }
  const subject = await getSubject(id);
  if (!subject) {
    return <div>Subject not found.</div>;
  }
  if (subject.teacher.id !== loggedInTeacher.id) {
    return <div>You do not have permission to view this subject.</div>;
  }

  const attendance = await getSubjectAttendance(subject.id);

  const classes = await getAllClasses();

  return (
    <Suspense fallback={<div>Loading subject details...</div>}>
      <SubjectDetailsPage subject={subject} teacher={loggedInTeacher} classes={classes} subjectAttendace={attendance} />
    </Suspense>
  );
}
