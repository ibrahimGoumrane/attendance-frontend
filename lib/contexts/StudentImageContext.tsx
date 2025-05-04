"use client";
import { StudentImage } from "../types/api";
import { createResourceContext, ResourceProvider } from "./ResourceContext";

export const [StudentImageContext, useStudentImageContext] = createResourceContext<StudentImage>();

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
