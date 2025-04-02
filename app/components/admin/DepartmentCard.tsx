"use client";

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DepartmentCardProps } from "@/lib/types/departmentProps";

export default function DepartmentCard({ department } : DepartmentCardProps) {
  return (
    <Card className="gap-2 py-4" key={department.id}>
      <CardHeader className="pb-2 flex items-center gap-2">
        <CardTitle className="text-xl ml-2 text-center w-full">
          {department.name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}