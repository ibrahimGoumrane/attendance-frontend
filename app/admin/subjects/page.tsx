import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SubjectsTable } from "@/components/admin/subjects/subject-table";
import { SubjectsTableSkeleton } from "@/components/admin/subjects/subject-table-skeleton";

export const metadata = {
  title: "Subjects | Admin Dashboard",
  description: "Manage subjects in your educational institution",
};

export default function SubjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
          <p className="text-muted-foreground">
            Manage subjects and their assignments to teachers and classes
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/subjects/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Subject
          </Link>
        </Button>
      </div>
      <Suspense fallback={<SubjectsTableSkeleton />}>
        <SubjectsTable />
      </Suspense>
    </div>
  );
}
