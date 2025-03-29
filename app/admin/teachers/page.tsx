import { getAllTeachers } from "@/lib/services/teachers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Teachers() {
  const teachers = await getAllTeachers();

  return (
    <>
      <h1 className="font-bold text-2xl">Teachers</h1>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {teachers.map((teacher) => (
          <Card className="gap-2" key={teacher.id}>
            <CardHeader className="pb-2 flex items-center gap-2">
              <CardTitle className="text-xl ml-2">
                {teacher.user.firstName} {teacher.user.lastName}
              </CardTitle>
              <Badge variant="outline" className="w-fit text-[0.75rem]">
                {teacher.department}
              </Badge>
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
          </Card>
        ))}
      </div>
    </>
  );
}
