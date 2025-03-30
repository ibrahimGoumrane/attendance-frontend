"use client";

import { Teacher } from "@/lib/types/api";
import TeacherCard from "./TeacherCard";

export default function TeacherGrid({ teachers }: { teachers: Teacher[] }) {
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
