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
  Clock,
  AlertTriangle,
} from "lucide-react";
import { AttendanceOverviewChart } from "@/components/admin/dashboard/attendance-overview-chart";
import { DepartmentPerformanceChart } from "@/components/admin/dashboard/department-performance-chart";
import { AttendanceHeatmap } from "@/components/admin/dashboard/attendance-heatmap";
import { ClassAttendanceMonitor } from "@/components/admin/dashboard/class-attendance-monitor";
import { AttendanceDistributionChart } from "@/components/admin/dashboard/attendance-distribution-chart";
import { WeeklyTrendsChart } from "@/components/admin/dashboard/weekly-trends-chart";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time attendance analytics and insights
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
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
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              +12% from last semester
            </p>
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
            <div className="text-2xl font-bold text-green-600">87.3%</div>
            <p className="text-xs text-muted-foreground">
              1,090 students present
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Classes
            </CardTitle>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Out of 42 total classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7</div>
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
            <AttendanceOverviewChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Attendance rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentPerformanceChart />
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Patterns</CardTitle>
            <CardDescription>
              Attendance distribution throughout the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyTrendsChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
            <CardDescription>
              Student attendance rate distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceDistributionChart />
          </CardContent>
        </Card>
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
          <AttendanceHeatmap />
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
          <ClassAttendanceMonitor />
        </CardContent>
      </Card>
    </div>
  );
}
