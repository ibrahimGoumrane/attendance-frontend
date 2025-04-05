"use client";

import { useEffect, useState } from "react";
import { getDepartmentTeachers } from "@/lib/services/departments";
import AppDialog from "../AppDialog";
import DepartmentCard from "./DepartmentCard";
import { DepartmentCardProps } from "@/lib/types/departmentProps";
import { Teacher } from "@/lib/types/api";
import TeacherGrid from "./TeacherGrid";
import DeleteDepartmentDialog from "./DeleteDepartmentDialog";

export function DepartmentInfoDialog({
  department,
  onDepartmentDeleted,
  onDepartmentEdited,
}: DepartmentCardProps) {
  const [deptTeachers, setDeptTeachers] = useState<Teacher[]>([]);
  console.log(deptTeachers);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const teachers = await getDepartmentTeachers(department.id);
        setDeptTeachers(teachers);
      } catch (error) {
        console.error("Failed to fetch department teachers:", error);
      } finally {
        setLoading(false);
      }
    }
    if (open) {
      // Only fetch when dialog is opened
      fetchTeachers();
    }
  }, [open, department.id]);

  return (
    <AppDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <DepartmentCard
          onDepartmentDeleted={onDepartmentDeleted}
          onDepartmentEdited={onDepartmentEdited}
          department={department}
        />
      }
      title={
        <div className="flex items-center gap-2">
          {department.name + " " + "Department"}
          <DeleteDepartmentDialog
            department={department}
            onDepartmentDeleted={(id: string) => {
              onDepartmentDeleted(id);
              setOpen(false);
            }}
          />
        </div>
      }
      content={
        <>
          {department.description && (
            <p className="italic">{department.description}</p>
          )}
          <h3 className="text-xl font-semibold">Teachers</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <TeacherGrid teachers={deptTeachers} />
          )}
        </>
      }
      contentClassName="sm:max-w-2/3 w-full"
    />
  );
}
