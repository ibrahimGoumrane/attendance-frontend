import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  GraduationCap,
  BookOpen,
  AlertTriangle,
  Check,
} from "lucide-react";
import { AttendanceOverviewChart } from "@/components/admin/dashboard/attendance-overview-chart";
import { DepartmentPerformanceChart } from "@/components/admin/dashboard/department-performance-chart";
import { AttendanceHeatmap } from "@/components/admin/dashboard/attendance-heatmap";
import { SubjectAttendanceMonitor } from "@/components/admin/dashboard/class-attendance-monitor";
// import { AttendanceDistributionChart } from "@/components/admin/dashboard/attendance-distribution-chart";
import { WeeklyTrendsChart } from "@/components/admin/dashboard/weekly-trends-chart";
import { getSubjectsAttendanceToday } from "@/lib/services/subject";
import { getTotalStudents } from "@/lib/services/students";
import { getTotalClasses } from "@/lib/services/classes";
import {
  getAttendanceHourlyThisWeek,
  getAttendanceLast30Days,
  getAttendanceThisWeek,
} from "@/lib/services/attendances";
import { getDepartmentsAttendances } from "@/lib/services/departments";
import { LastUpdated } from "@/components/admin/dashboard/last-updated";

export default async function AdminDashboard() {
  const subjectsAttendance = await getSubjectsAttendanceToday();
  const { total: totalStudents } = await getTotalStudents();
  const { total: totalClasses } = await getTotalClasses();
  const departmentsAttendance = await getDepartmentsAttendances();
  const dailyAttendance = await getAttendanceLast30Days();
  const attendanceLast7Days = await getAttendanceThisWeek();
  const attendanceHourlyThisWeek = await getAttendanceHourlyThisWeek();
  const attendanceStats = subjectsAttendance.reduce(
    (acc, subject) => {
      const present = subject.presentStudents;
      const absent = subject.absentStudents.length;
      acc.present += present;
      acc.absent += absent;
      return acc;
    },
    { present: 0, absent: 0 }
  );

  // The calculation assumes that the class is only active if at least one of the subjects has that class today
  const activeClassesSet = new Set<string>();
  subjectsAttendance.forEach((subject) => {
    activeClassesSet.add(subject.subject.section_promo.id);
  });
  const activeClasses = activeClassesSet.size;

  // calculate the low attendance classes ( A class is considered low attendance if the attendance rate is below 75% )
  const lowAttendanceClasses = subjectsAttendance.filter((subject) => {
    const totalStudents =
      subject.presentStudents + subject.absentStudents.length;
    const attendanceRate = (subject.presentStudents / totalStudents) * 100;
    return attendanceRate < 75;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time attendance analytics and insights
          </p>
        </div>
        <LastUpdated />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent className="text-2xl font-bold flex items-stretch ">
            {totalStudents}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Attendance
            </CardTitle>
            <GraduationCap className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(attendanceStats.present /
                (attendanceStats.present + attendanceStats.absent || 1)) *
                100}{" "}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {attendanceStats.present} students present
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Classes
            </CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />{" "}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeClasses}</div>
            <p className="text-xs text-muted-foreground">
              Out of {totalClasses} total classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            {lowAttendanceClasses.length > 0 ? (
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            ) : (
              <Check className="w-4 h-4 text-green-600" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                lowAttendanceClasses.length > 0
                  ? "text-orange-600"
                  : "text-green-600"
              }`}
            >
              {lowAttendanceClasses.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Low attendance classes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>
              Daily attendance trends over the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceOverviewChart data={dailyAttendance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Attendance rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentPerformanceChart data={departmentsAttendance} />
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Patterns</CardTitle>
            <CardDescription>
              Attendance distribution throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyTrendsChart data={attendanceLast7Days} />
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>
              Student attendance rate distribution this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceDistributionChart />
          </CardContent>
        </Card> */}
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Heatmap</CardTitle>
          <CardDescription>
            Hourly attendance patterns across the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceHeatmap data={attendanceHourlyThisWeek} />
        </CardContent>
      </Card>

      {/* Class Attendance Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Live Class Attendance Monitor</CardTitle>
          <CardDescription>
            Real-time attendance tracking for all active classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubjectAttendanceMonitor subjectsAttendance={subjectsAttendance} />
        </CardContent>
      </Card>
    </div>
  );
}
