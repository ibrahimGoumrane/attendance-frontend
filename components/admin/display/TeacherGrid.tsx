"use client";

import { useTeacherContext } from "@/lib/contexts/TeacherContext";
import TeacherCard from "./TeacherCard";

export default function TeacherGrid({
  readOnly = false,
}: {
  readOnly: boolean;
}) {
  const { items: teachers } = useTeacherContext();
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} readOnly={readOnly} />
      ))}
    </div>
  );
}
