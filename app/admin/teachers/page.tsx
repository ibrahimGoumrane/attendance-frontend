"use client";

import { useEffect, useState } from "react";
import { getAllTeachers } from "@/lib/services/teachers";
import { AddTeacherDialog } from "@/app/components/admin/dialogs/TeacherDialogs";
import TeacherGrid from "@/app/components/admin/display/TeacherGrid";
import { Department, Teacher } from "@/lib/types/api";
import { getAllDepartments } from "@/lib/services/departments";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [departments, setDepartments] = useState<Department[]>([])
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
    async function fetchData() {
      try {
        const [teachersData, departmentsData] = await Promise.all([
          getAllTeachers(),
          getAllDepartments(),
        ]);
        setTeachers(teachersData);
        setDepartments(departmentsData);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        Teachers <AddTeacherDialog departments={departments} onTeacherAdded={addTeacherToState} />
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
          departments={departments}
        />
      )}
    </>
  );
}
