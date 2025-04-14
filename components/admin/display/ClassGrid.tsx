"use client";

import ClassCard from "./ClassCard";
import { useClassContext } from "@/lib/contexts/ClassContext";

export default function ClassGrid({}) {
  const { items: classes } = useClassContext();

  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {classes.map((cls) => (
        <ClassCard key={cls.id} cls={cls} />
      ))}
    </div>
  );
}
