import EditPage from "@/components/admin/teachers/edit";

export default function EditTeacherPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <EditPage id={id} />;
}
