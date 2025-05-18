"use client";
import { createResourceContext, ResourceProvider } from "./ResourceContext";
import { Teacher } from "../types/teacher";
export const [TeacherContext, useTeacherContext] =
  createResourceContext<Teacher>();

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
      getId={(teacher) => teacher.id!}
    >
      {children}
    </ResourceProvider>
  );
};
