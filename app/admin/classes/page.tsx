"use client";

import { AddClassDialog } from "@/components/admin/dialogs/ClassDialogs";
import ClassGrid from "@/components/admin/display/ClassGrid";
import { getAllClassesWithStudentCount } from "@/lib/services/classes";
import { Class } from "@/lib/types/api";
import { useEffect, useState } from "react";

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addClassToState = (cls: Class) => {
    cls.studentCount = 0;
    setClasses([...classes, cls]);
  };

  const deleteClassFromState = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  const editClassInState = (updatedClass: Class) => {
    setClasses(
      classes.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls))
    );
  };

  useEffect(() => {
    async function fetchClasses() {
      try {
        const classes = await getAllClassesWithStudentCount();
        setClasses(classes);
      } catch {
        setError("Failed to fetch classes");
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, []);
  return (
    <>
      <h1 className="font-bold text-2xl flex items-center gap-2">
        Classes <AddClassDialog onClassAdded={addClassToState} />
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ClassGrid
          onClassDeleted={deleteClassFromState}
          onClassEdited={editClassInState}
          classes={classes}
        />
      )}
    </>
  );
}
