import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight dark:text-white">
          Dashboard
        </h1>
        <p className="text-muted-foreground dark:text-gray-400">
          Welcome to the FaceTrack admin panel.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+2.5%</span> from
              last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+1.2%</span> from
              last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-1">
              No change from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              No change from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>
              Daily attendance statistics for the current month
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {/* Placeholder for chart */}
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Attendance Chart</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Attendance</CardTitle>
            <CardDescription>
              Summary for {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Present
                    </span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      85%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <UserCheck className="ml-4 h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium dark:text-gray-300">
                      Absent
                    </span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      15%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
                <UserX className="ml-4 h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Total Students</span>
                <span className="font-medium dark:text-white">1,284</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Present</span>
                <span className="font-medium dark:text-white">1,091</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Absent</span>
                <span className="font-medium dark:text-white">193</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0 dark:border-gray-800"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-primary-700 dark:text-primary-400 font-medium text-sm">
                    {["JD", "AS", "MK", "RL", "PT"][i - 1]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-white">
                    {
                      [
                        "John Doe marked attendance for Class 10A",
                        "Admin Smith added a new teacher",
                        "Mary King updated department information",
                        "Robert Lee uploaded student photos",
                        "Paul Thompson created a new class",
                      ][i - 1]
                    }
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {
                      [
                        "2 hours ago",
                        "5 hours ago",
                        "Yesterday at 4:30 PM",
                        "Yesterday at 2:15 PM",
                        "2 days ago",
                      ][i - 1]
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
