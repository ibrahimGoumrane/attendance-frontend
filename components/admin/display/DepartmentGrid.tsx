"use client";

import { DepartmentInfoDialog } from "../dialogs/DepartmentInfoDialog";
import { useDepartmentContext } from "@/lib/contexts/DepartmentContext";

export default function DepartmentGrid() {
  const { items : departments } = useDepartmentContext();
  return (
    <div className="mt-4 gap-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {departments.map((department) => (
        <DepartmentInfoDialog
          key={department.id}
          department={department}
        />
      ))}
    </div>
  );
}
