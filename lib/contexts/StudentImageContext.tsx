"use client";
import { createResourceContext, ResourceProvider } from "./ResourceContext";
import { StudentImage } from "../types/user";
export const [StudentImageContext, useStudentImageContext] =
  createResourceContext<StudentImage>();

export const StudentImageProvider = ({
  initialStudentImages,
  children,
}: {
  initialStudentImages: StudentImage[];
  children: React.ReactNode;
}) => {
  return (
    <ResourceProvider
      context={StudentImageContext}
      initialItems={initialStudentImages}
      getId={(img) => img.id}
    >
      {children}
    </ResourceProvider>
  );
};
