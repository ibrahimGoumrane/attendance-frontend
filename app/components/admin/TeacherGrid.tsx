"use client";

import TeacherCard from "./TeacherCard";
import { TeacherGridProps } from "@/lib/types/teacherGrid";

export default function TeacherGrid({
  teachers,
  onTeacherDeleted,
  onTeacherEdited,
}: TeacherGridProps) {
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {teachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          onTeacherDeleted={onTeacherDeleted}
          onTeacherEdited={onTeacherEdited}
        />
      ))}
    </div>
  );
}
