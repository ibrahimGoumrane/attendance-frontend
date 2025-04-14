"use client";

import { useEffect, useState } from "react";
import { getDepartmentTeachers } from "@/lib/services/departments";
import AppDialog from "../../AppDialog";
import DepartmentCard from "../display/DepartmentCard";
import { Department, Teacher } from "@/lib/types/api";
import TeacherGrid from "../display/TeacherGrid";
import {
  DeleteDepartmentDialog,
  EditDepartmentDialog,
} from "./DepartmentDialogs";
import { TeacherProvider } from "@/lib/contexts/TeacherContext";

export function DepartmentInfoDialog({
  department,
}: {
  department: Department;
}) {
  const [deptTeachers, setDeptTeachers] = useState<Teacher[]>([]);
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
      trigger={<DepartmentCard department={department} />}
      title={
        <div className="flex items-center gap-2">
          {department.name + " " + "Department"}
          <DeleteDepartmentDialog department={department} />
          <span>
            <EditDepartmentDialog department={department} />
          </span>
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
            <TeacherProvider initialTeachers={deptTeachers}>
              <TeacherGrid readOnly={true} />
            </TeacherProvider>
          )}
        </>
      }
      contentClassName="sm:max-w-2/3 w-full"
    />
  );
}
