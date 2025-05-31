"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Jan 1", attendance: 85 },
  { date: "Jan 2", attendance: 87 },
  { date: "Jan 3", attendance: 82 },
  { date: "Jan 4", attendance: 89 },
  { date: "Jan 5", attendance: 91 },
  { date: "Jan 8", attendance: 88 },
  { date: "Jan 9", attendance: 86 },
  { date: "Jan 10", attendance: 90 },
  { date: "Jan 11", attendance: 85 },
  { date: "Jan 12", attendance: 87 },
  { date: "Jan 15", attendance: 89 },
  { date: "Jan 16", attendance: 92 },
  { date: "Jan 17", attendance: 88 },
  { date: "Jan 18", attendance: 86 },
  { date: "Jan 19", attendance: 90 },
  { date: "Jan 22", attendance: 87 },
  { date: "Jan 23", attendance: 89 },
  { date: "Jan 24", attendance: 91 },
  { date: "Jan 25", attendance: 88 },
  { date: "Jan 26", attendance: 85 },
  { date: "Jan 29", attendance: 87 },
  { date: "Jan 30", attendance: 90 },
]

export function AttendanceOverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
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
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-muted-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attendance</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
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
          style={{
            stroke: "var(--color-primary)",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
