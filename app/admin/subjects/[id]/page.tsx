import { Suspense } from "react";

import SubjectDetailsPage from "@/components/admin/subjects/get";
import { getSubject } from "@/lib/services/subject";
import { getAllTeachers } from "@/lib/services/teachers";
import { getAllClasses } from "@/lib/services/classes";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subject = await getSubject(id);
  const teachers = await getAllTeachers();
  const classes = await getAllClasses();

  return (
    <Suspense fallback={<div>Loading subject details...</div>}>
      <SubjectDetailsPage
        subject={subject}
        teachers={teachers}
        classes={classes}
      />
    </Suspense>
  );
}
