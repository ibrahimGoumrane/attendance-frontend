"use client"

const hours = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const heatmapData = [
  [85, 88, 92, 89, 87, 85, 82],
  [87, 90, 94, 91, 89, 87, 84],
  [89, 92, 96, 93, 91, 89, 86],
  [91, 94, 98, 95, 93, 91, 88],
  [88, 91, 95, 92, 90, 88, 85],
  [86, 89, 93, 90, 88, 86, 83],
  [84, 87, 91, 88, 86, 84, 81],
  [82, 85, 89, 86, 84, 82, 79],
  [80, 83, 87, 84, 82, 80, 77],
  [78, 81, 85, 82, 80, 78, 75],
]

function getColorIntensity(value: number) {
  if (value >= 95) return "bg-green-600"
  if (value >= 90) return "bg-green-500"
  if (value >= 85) return "bg-green-400"
  if (value >= 80) return "bg-yellow-400"
  if (value >= 75) return "bg-orange-400"
  return "bg-red-400"
}

export function AttendanceHeatmap() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-8 gap-1 text-xs">
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {hours.map((hour, hourIndex) => (
          <div key={hour} className="contents">
            <div className="text-right pr-2 font-medium">{hour}</div>
            {days.map((day, dayIndex) => {
              const value = heatmapData[hourIndex][dayIndex]
              return (
                <div
                  key={`${hour}-${day}`}
                  className={`h-8 rounded ${getColorIntensity(value)} flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:scale-110 transition-transform`}
                  title={`${day} ${hour}: ${value}% attendance`}
                >
                  {value}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-red-400 rounded"></div>
          <div className="w-3 h-3 bg-orange-400 rounded"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded"></div>
          <div className="w-3 h-3 bg-green-400 rounded"></div>
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <div className="w-3 h-3 bg-green-600 rounded"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
