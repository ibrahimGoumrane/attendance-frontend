import { getAllTeachers } from "@/lib/services/teachers";
import TeacherCard from "@/app/components/admin/TeacherCard";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Teachers() {
  const teachers = await getAllTeachers();
  return (
    <>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        Teachers{" "}
        <Button size={"sm"} className="ml-auto text-xs" variant={"outline"}>
          <PlusCircle /> Add New
        </Button>
      </h1>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </>
  );
}
