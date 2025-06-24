"use client";

import { DailyAttendance } from "@/lib/types/attendance";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTheme } from "next-themes";

interface TeacherWeeklyTrendsChartProps {
  data: DailyAttendance[];
}

export function TeacherWeeklyTrendsChart({ data }: TeacherWeeklyTrendsChartProps) {
  const { resolvedTheme } = useTheme();
  const textColor = resolvedTheme === "dark" ? "#e1e1e6" : "#888888";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
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
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                      <span className="font-bold text-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attendance</span>
                      <span className="font-bold text-foreground">{Number(payload[0].value).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="attendance"
          stroke="var(--color-primary)"
          fill="var(--color-primary)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
