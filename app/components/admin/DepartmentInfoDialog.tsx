"use client";

import { useEffect, useState } from "react";
import { getDepartmentTeachers } from "@/lib/services/departments";
import AppDialog from "../AppDialog";
import DepartmentCard from "./DepartmentCard";
import { DepartmentCardProps } from "@/lib/types/departmentProps";
import { Teacher } from "@/lib/types/api";

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
      title={department.name + " " + "Department"}
      content={
        loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {deptTeachers.map((teacher) => (
              <li key={teacher.user.email}>
                {teacher.user.firstName} {teacher.user.lastName} -{" "}
                <a href={`mailto:${teacher.user.email}`}>
                  {teacher.user.email}
                </a>
              </li>
            ))}
          </ul>
        )
      }
    />
  );
}
