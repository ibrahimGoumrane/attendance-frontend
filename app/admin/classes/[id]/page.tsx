"use server";
import Main from "@/components/admin/classes/get";
import { getClass } from "@/lib/services/classes";

export default async function ClassDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const classData = await getClass(id);
  if (!classData) {
    return <div>Class not found</div>;
  }
  return <Main classData={classData} />;
}
