"use client";

import { DepartmentGridProps } from "@/lib/types/departmentProps";
import { DepartmentInfoDialog } from "./DepartmentInfoDialog";

export default function DepartmentGrid({
  departments,
  onDepartmentDeleted,
  onDepartmentEdited,
}: DepartmentGridProps) {
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {departments.map((department) => (
        <DepartmentInfoDialog
          key={department.id}
          department={department}
          onDepartmentDeleted={onDepartmentDeleted}
          onDepartmentEdited={onDepartmentEdited}
        />
      ))}
    </div>
  );
}
