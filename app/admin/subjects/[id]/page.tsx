import { Suspense } from "react";

import { SubjectDetail } from "@/components/admin/subjects/subject-detail";
import { getSubject } from "@/lib/services/subject";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subject = await getSubject(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubjectDetail subject={subject} attendances={[]} />
    </Suspense>
  );
}
