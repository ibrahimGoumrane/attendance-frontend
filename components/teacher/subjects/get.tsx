"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, BookOpen, Edit, Trash2, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Subject } from "@/lib/types/subject";
import { Teacher } from "@/lib/types/teacher";
import { Class } from "@/lib/types/class";
import UpdateSubjectForm from "./edit";
import DeleteSubject from "./delete";
import { Attendance } from "@/lib/types/attendance";
import { AttendanceHistory } from "../attendance-history";

interface MainProps {
  subject: Subject;
  teacher: Teacher;
  classes: Class[];
  subjectAttendace: Attendance[];
}

export default function SubjectDetailsPage({ subject, teacher, classes, subjectAttendace }: MainProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const totalAttendances = subjectAttendace.length;
  const presentCount = subjectAttendace.filter(a => a.status === "present").length;
  const presentPercentage = totalAttendances > 0 ? (presentCount / totalAttendances) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/teacher/subjects">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-2">{subject.name}</h1>
          <p className="text-muted-foreground">Details for your subject</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsEditModalOpen(true)} className="gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)} className="gap-1">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject Information</CardTitle>
            <CardDescription>Basic details about this subject</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Subject Name</dt>
                <dd className="text-lg font-semibold">{subject.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Class</dt>
                <dd className="text-lg font-semibold">
                  <Link
                    href={`/teacher/classes/${subject.section_promo?.id || ""}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    {subject.section_promo?.name || "N/A"}
                  </Link>
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
            <CardDescription>Key metrics for this subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span className="text-sm font-medium">Students Enrolled</span>
                </div>
                <p className="text-2xl font-bold">{subject.section_promo?.studentCount || "N/A"}</p>
              </div>
              <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Attendance Rate</span>
                </div>
                <p className="text-2xl font-bold">{presentPercentage.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Attendance History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="attendance" className="mt-4 pt-2">
          <AttendanceHistory attendances={subjectAttendace} subjects={[subject]} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <UpdateSubjectForm
        subjectData={subject}
        teacher={teacher}
        classes={classes}
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
      <DeleteSubject id={subject.id} open={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} />
    </div>
  );
}
