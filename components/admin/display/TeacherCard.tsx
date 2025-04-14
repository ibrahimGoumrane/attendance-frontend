import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EditTeacherDialog,
  DeleteTeacherDialog,
} from "../dialogs/TeacherDialogs";
import { Teacher } from "@/lib/types/api";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";

export default function TeacherCard({
  teacher,
  readOnly = false,
}: {
  teacher: Teacher;
  readOnly: boolean;
}) {
  const { items: departments } = useDepartmentContext();
  return (
    <Card className="gap-2 py-4" key={teacher.id}>
      <CardHeader className="pb-2 flex items-center gap-2">
        <CardTitle className="text-xl ml-2">
          {teacher.user.firstName} {teacher.user.lastName}
        </CardTitle>
        {departments && (
          <Badge variant="outline" className="w-fit text-[0.75rem]">
            {departments.find((d) => d.id === teacher.department)?.name}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-slate-700">
          <a href={`mailto:${teacher.user.email}`}>
            <Button
              className="cursor-pointer mr-2 border-2 rounded-full p-0"
              variant={"ghost"}
              size={"icon"}
            >
              <Mail className="size-5" />
            </Button>
          </a>
          <a
            className="hover:text-slate-900 hover:underline"
            href={`mailto:${teacher.user.email}`}
          >
            {teacher.user.email}
          </a>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!readOnly && (
          <>
            <EditTeacherDialog teacher={teacher} />
            <DeleteTeacherDialog teacher={teacher} />
          </>
        )}
      </CardFooter>
    </Card>
  );
}
