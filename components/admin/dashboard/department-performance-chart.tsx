"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { department: "Computer Science", attendance: 92 },
  { department: "Mathematics", attendance: 89 },
  { department: "Physics", attendance: 87 },
  { department: "Chemistry", attendance: 85 },
  { department: "Biology", attendance: 88 },
  { department: "English", attendance: 91 },
  { department: "History", attendance: 83 },
]

export function DepartmentPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="horizontal">
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="department" type="category" width={80} fontSize={12} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Department</span>
                      <span className="font-bold text-muted-foreground">{label}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Attendance Rate</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar
          dataKey="attendance"
          style={{
            fill: "var(--color-primary)",
          }}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
