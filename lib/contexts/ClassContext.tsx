"use client";
import { Class } from "../types/class";
import { createResourceContext, ResourceProvider } from "./ResourceContext";

export const [ClassContext, useClassContext] = createResourceContext<Class>();

export const ClassProvider = ({
  initialClasses,
  children,
}: {
  initialClasses: Class[];
  children: React.ReactNode;
}) => {
  return (
    <ResourceProvider
      context={ClassContext}
      initialItems={initialClasses}
      getId={(cls) => cls.id}
      onAddItem={(item) => {
        if (item.studentCount === undefined) {
          item.studentCount = 0;
        }
      }}
    >
      {children}
    </ResourceProvider>
  );
};
