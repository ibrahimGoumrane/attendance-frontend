"use client";
import { createResourceContext, ResourceProvider } from "./ResourceContext";
import { Department } from "../types/department";
export const [DepartmentContext, useDepartmentContext] =
  createResourceContext<Department>();

export const DepartmentProvider = ({
  initialDepartments,
  children,
}: {
  initialDepartments: Department[];
  children: React.ReactNode;
}) => {
  return (
    <ResourceProvider
      context={DepartmentContext}
      initialItems={initialDepartments}
      getId={(department) => department.id}
      onAddItem={(department) => (department.teacherCount = 0)}
      onEditItem={(department) =>
        (department.teacherCount = department.teacherCount)
      }
    >
      {children}
    </ResourceProvider>
  );
};
