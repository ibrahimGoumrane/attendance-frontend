"use client";

import { Student } from "@/lib/types/api";
import StudentCard from "./StudentCard";

export default function StudentGrid({ students }: { students: Student[] }) {
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {students.map((student) => (
        <StudentCard student={student} key={student.id} />
      ))}
    </div>
  );
}
