import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, AlertTriangle, Check } from "lucide-react";
import { TeacherSubjectAttendanceMonitor } from "@/components/teacher/dashboard/teacher-subject-attendance-monitor";
import { TeacherAttendanceOverviewChart } from "@/components/teacher/dashboard/teacher-attendance-overview-chart";
import { TeacherWeeklyTrendsChart } from "@/components/teacher/dashboard/teacher-weekly-trends-chart";
import { TeacherAttendanceHeatmap } from "@/components/teacher/dashboard/teacher-attendance-heatmap";
import { LastUpdated } from "@/components/teacher/dashboard/last-updated";
import { getTeacherSubjectsAttendanceToday } from "@/lib/services/subject";
import {
  getTeacherAttendanceHourlyThisWeek,
  getTeacherAttendanceLast30Days,
  getTeacherAttendanceThisWeek,
} from "@/lib/services/attendances";
import { getLoggedInTeacher } from "@/lib/services/users";
import { getTeacherTotalClasses, getTeacherTotalStudents, getTeacherTotalSubjects } from "@/lib/services/teachers";

export default async function TeacherDashboard() {
  const loggedInTeacher = await getLoggedInTeacher();
  if (!loggedInTeacher) {
    return <div className="text-center text-muted-foreground">You must be logged in to view this page.</div>;
  }
  const [
    { total: totalStudents },
    { total: totalSubjects },
    { total: totalClasses },
    subjectsAttendance,
    dailyAttendance,
    attendanceLast7Days,
    attendanceHourlyThisWeek,
  ] = await Promise.all([
    getTeacherTotalStudents(loggedInTeacher.id),
    getTeacherTotalSubjects(loggedInTeacher.id),
    getTeacherTotalClasses(loggedInTeacher.id),
    getTeacherSubjectsAttendanceToday(loggedInTeacher.id),
    getTeacherAttendanceLast30Days(loggedInTeacher.id),
    getTeacherAttendanceThisWeek(loggedInTeacher.id),
    getTeacherAttendanceHourlyThisWeek(loggedInTeacher.id),
  ]);

  const attendanceStats = subjectsAttendance.reduce(
    (acc, subjectAttendance) => {
      const present = subjectAttendance.presentStudents;
      const absent = subjectAttendance.absentStudents.length;
      acc.present += present;
      acc.absent += absent;
      return acc;
    },
    { present: 0, absent: 0 }
  );

  const totalRecords = attendanceStats.present + attendanceStats.absent;
  const attendanceRate = totalRecords > 0 ? (attendanceStats.present / totalRecords) * 100 : 0;

  const lowAttendanceSubjects = subjectsAttendance.filter(subject => {
    const total = subject.presentStudents + subject.absentStudents.length;
    const rate = (subject.presentStudents / total) * 100;
    return rate < 75;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Real-time attendance analytics and insights for your subjects</p>
        </div>
        <LastUpdated />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Your Students</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across {totalClasses} classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Today&apos;s Attendance</CardTitle>
            <Check className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">{attendanceStats.present} presence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Your Subjects</CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubjects}</div>
            <p className="text-xs text-muted-foreground">Total subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            {lowAttendanceSubjects.length > 0 ? (
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            ) : (
              <Check className="w-4 h-4 text-green-600" />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                lowAttendanceSubjects.length > 0 ? "text-orange-600" : "text-green-600"
              }`}
            >
              {lowAttendanceSubjects.length}
            </div>
            <p className="text-xs text-muted-foreground">Low attendance subjects</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Overview</CardTitle>
            <CardDescription>Your subjects&apos; daily attendance trends over the past 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <TeacherAttendanceOverviewChart data={dailyAttendance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Trends</CardTitle>
            <CardDescription>Attendance patterns across your subjects throughout the week</CardDescription>
          </CardHeader>
          <CardContent>
            <TeacherWeeklyTrendsChart data={attendanceLast7Days} />
          </CardContent>
        </Card>
      </div>

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Your subjects Attendance Heatmap</CardTitle>
          <CardDescription>Hourly attendance patterns for your subjects this week</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherAttendanceHeatmap data={attendanceHourlyThisWeek} />
        </CardContent>
      </Card>

      {/* Subject Attendance Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Your Subjects Attendance</CardTitle>
          <CardDescription>Real-time attendance tracking for your assigned subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <TeacherSubjectAttendanceMonitor subjectsAttendance={subjectsAttendance} />
        </CardContent>
      </Card>
    </div>
  );
}
