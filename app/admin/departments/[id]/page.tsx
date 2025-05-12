"use server";
import Main from "@/components/admin/departments/get";
import { getDepartment } from "@/lib/services/departments";

export default async function ClassDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const departmentData = await getDepartment(id);
  if (!departmentData) {
    return <div>Department not found</div>;
  }
  return <Main department={departmentData} />;
}
