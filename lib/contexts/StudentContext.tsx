"use client";
import { createResourceContext, ResourceProvider } from "./ResourceContext";
import { Student } from "../types/student";
export const [StudentContext, useStudentContext] =
  createResourceContext<Student>();

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
