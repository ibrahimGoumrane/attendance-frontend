"use client";

import { useEffect, useState } from "react";
import { getAllTeachers } from "@/lib/services/teachers";
import AddTeacherDialog from "@/app/components/admin/AddTeacherDialog";
import TeacherGrid from "@/app/components/admin/TeacherGrid";
import { Teacher } from "@/lib/types/api";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addTeacherToState = (teacher: Teacher) => {
    setTeachers([...teachers, teacher]);
  };

  const deleteTeacherFromState = (id: string) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  const editTeacherInState = (updatedTeacher: Teacher) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    );
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
      } catch {
        setError("Failed to fetch teachers");
      } finally {
        setLoading(false);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        Teachers <AddTeacherDialog onTeacherAdded={addTeacherToState} />
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <TeacherGrid
          onTeacherDeleted={deleteTeacherFromState}
          onTeacherEdited={editTeacherInState}
          teachers={teachers}
        />
      )}
    </>
  );
}
