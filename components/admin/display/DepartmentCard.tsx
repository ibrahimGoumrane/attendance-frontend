"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DepartmentCardProps } from "@/lib/types/departmentProps";

export default function DepartmentCard({
  department,
  onClick,
}: DepartmentCardProps & { onClick?: () => void }) {
  return (
    <Card
      className="gap-2 py-4 cursor-pointer hover:bg-muted/50"
      key={department.id}
      onClick={onClick}
    >
      <CardHeader className="pb-2 flex items-center gap-2">
        <CardTitle className="text-xl ml-2 text-center w-full">
          {department.name}
        </CardTitle>
      </CardHeader>
      {department.teacherCount !== undefined && (
        <CardContent className="text-center italic">
          {department.teacherCount === 0
            ? "No teachers"
            : department.teacherCount === 1
            ? "1 teacher"
            : `${department.teacherCount} teachers`}
        </CardContent>
      )}
    </Card>
  );
}
