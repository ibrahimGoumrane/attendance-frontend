"use client";

import { ClassGridProps } from "@/lib/types/classProps";
import ClassCard from "./ClassCard";
import { Class } from "@/lib/types/api";

export default function ClassGrid({
  classes,

}: ClassGridProps) {
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {classes.map((cls) => (
        <ClassCard
          key={cls.id}
          cls={cls} onClassDeleted={function (id: string): void {
            throw new Error("Function not implemented.");
          } } onClassEdited={function (cls: Class): void {
            throw new Error("Function not implemented.");
          } }        />
      ))}
    </div>
  );
}
