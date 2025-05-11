import Main from "@/components/admin/teachers/main";

export default async function TeacherDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <Main id={id.toString()} />;
}
