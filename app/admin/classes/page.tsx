"use client";

import ClassGrid from "@/components/admin/display/ClassGrid";
import { getAllClassesWithStudentCount } from "@/lib/services/classes";
import { Class } from "@/lib/types/api";
import { useEffect, useState } from "react";

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        Classes
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ClassGrid classes={classes} />
      )}
    </>
  );
}
