"use client";
import { Teacher } from "../types/api";
import { createResourceContext, ResourceProvider } from "./ResourceContext";

export const [TeacherContext, useTeacherContext] = createResourceContext<Teacher>();

export const TeacherProvider = ({
  initialTeachers,
  children,
}: {
  initialTeachers: Teacher[];
  children: React.ReactNode;
}) => {
  return (
    <ResourceProvider
      context={TeacherContext}
      initialItems={initialTeachers}
      getId={(teacher) => teacher.id}
    >
      {children}
    </ResourceProvider>
  );
};
