"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", attendance: 88 },
  { day: "Tue", attendance: 91 },
  { day: "Wed", attendance: 89 },
  { day: "Thu", attendance: 87 },
  { day: "Fri", attendance: 85 },
  { day: "Sat", attendance: 82 },
  { day: "Sun", attendance: 79 },
];

export function WeeklyTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis
          dataKey="day"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Day
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Attendance
                      </span>
                      <span className="font-bold">{payload[0].value}%</span>
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
