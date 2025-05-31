"use client";

const hours = [
  "8:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00 (Break)",
  "14:00 - 16:00",
  "16:00 - 18:00",
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const heatmapData = [
  [85, 88, 92, 89, 87, 85, 82],
  [87, 90, 94, 91, 89, 87, 84],
  [89, 92, 96, 93, 91, 89, 86],
  [91, 94, 98, 95, 93, 91, 88],
  [88, 91, 95, 92, 90, 88, 85],
];

function getColorIntensity(value: number) {
  if (value >= 95) return "bg-green-600";
  if (value >= 90) return "bg-green-500";
  if (value >= 85) return "bg-green-400";
  if (value >= 80) return "bg-yellow-400";
  if (value >= 75) return "bg-orange-400";
  return "bg-red-400";
}

export function AttendanceHeatmap() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-1 text-xs">
        <div></div>
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {hours.map((hour, hourIndex) => (
          <div key={hour} className="contents">
            <div
              className={`text-right pr-2 font-medium ${
                hour.includes("Break") ? "text-blue-500 italic" : ""
              }`}
            >
              {hour}
            </div>
            {days.map((day, dayIndex) => {
              const value = heatmapData[hourIndex][dayIndex];
              // If it's the break hour, show a break cell instead of value
              if (hour.includes("Break")) {
                return (
                  <div
                    key={`${hour}-${day}`}
                    className="h-12 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-medium italic"
                  >
                    Break
                  </div>
                );
              }
              return (
                <div
                  key={`${hour}-${day}`}
                  className={`h-12 rounded ${getColorIntensity(
                    value
                  )} flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:scale-110 transition-transform`}
                  title={`${day} ${hour}: ${value}% attendance`}
                >
                  {value}
                </div>
              );
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
  );
}
