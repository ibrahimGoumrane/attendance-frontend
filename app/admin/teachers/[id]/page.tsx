import Main from "@/components/admin/teachers/get";

export default async function TeacherDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <Main id={id.toString()} />;
}
