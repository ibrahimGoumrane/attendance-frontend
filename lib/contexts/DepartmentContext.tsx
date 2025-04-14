"use client";
import { Department } from "../types/api";
import { createResourceContext, ResourceProvider } from "./ResourceContext";

export const [DepartmentContext, useDepartmentContext] = createResourceContext<Department>();

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
    >
      {children}
    </ResourceProvider>
  );
};
