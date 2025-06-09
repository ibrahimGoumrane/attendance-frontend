"use client";

import { DailyAttendance } from "@/lib/types/attendance";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";

interface TeacherAttendanceOverviewChartProps {
  data: DailyAttendance[];
}

export function TeacherAttendanceOverviewChart({ data }: TeacherAttendanceOverviewChartProps) {
  const { resolvedTheme } = useTheme();

  const textColor = resolvedTheme === "dark" ? "#e1e1e6" : "#888888";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke={textColor}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `${value}%`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attendance</span>
                      <span className="font-bold text-foreground">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="attendance"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "var(--color-primary)", opacity: 0.25 },
          }}
          stroke="var(--color-primary)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
