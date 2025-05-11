import Main from "@/components/admin/teachers/main";
import { redirect } from "next/navigation";

export default async function TeacherDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  if (!id) {
    redirect("/admin/teachers");
  }
  return <Main id={id.toString()} />;
}
