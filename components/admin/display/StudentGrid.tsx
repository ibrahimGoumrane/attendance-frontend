"use client";

import StudentCard from "./StudentCard";
import { useStudentContext } from "@/lib/contexts/StudentContext";

export default function StudentGrid() {
  const {items : students} = useStudentContext();
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {students.map((student) => (
        <StudentCard student={student} key={student.id} />
      ))}
    </div>
  );
}
