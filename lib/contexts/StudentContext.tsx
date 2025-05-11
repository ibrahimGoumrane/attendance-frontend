"use client";
import { Student } from "../types/api";
import { createResourceContext, ResourceProvider } from "./ResourceContext";

export const [StudentContext, useStudentContext] =
  createResourceContext<Partial<Student>>();

export const StudentProvider = ({
  initialStudents,
  children,
}: {
  initialStudents: Student[];
  children: React.ReactNode;
}) => {
  return (
    <ResourceProvider
      context={StudentContext}
      initialItems={initialStudents}
      getId={(student) => student.id!}
    >
      {children}
    </ResourceProvider>
  );
};
