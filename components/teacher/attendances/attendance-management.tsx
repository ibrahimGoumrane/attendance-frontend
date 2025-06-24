"use client";

import { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Subject } from "@/lib/types/subject";
import { Attendance } from "@/lib/types/attendance";
import { AttendanceList } from "./list";
import { AttendanceRecorder } from "./attendance-recorder";
import { Student } from "@/lib/types/student";

interface AttendanceManagementProps {
  subjects: Subject[];
  attendances: Attendance[];
  students: Student[];
}

export function AttendanceManagement({ subjects, attendances, students }: AttendanceManagementProps) {
  const [activeTab, setActiveTab] = useState("record");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
        <p className="text-muted-foreground">Record attendance manually or process images automatically</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="record" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Record Attendance
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Attendance History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-6">
          <AttendanceRecorder subjects={subjects} students={students} />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <AttendanceList records={attendances} subjects={subjects} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
