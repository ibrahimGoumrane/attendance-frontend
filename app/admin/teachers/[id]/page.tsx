import Main from "@/components/admin/teachers/get";
import { getDepartment } from "@/lib/services/departments";
import { getTeacher } from "@/lib/services/teachers";

export default async function TeacherDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const teacher = await getTeacher(id);
  if (!teacher) {
    return <div>Teacher not found</div>;
  }
  const department = await getDepartment(teacher.department);
  if (!department) {
    return <div>Department not found</div>;
  }
  return <Main id={id} teacher={teacher} department={department} />;
}
