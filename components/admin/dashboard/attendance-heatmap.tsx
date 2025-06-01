"use client";

import { AttendanceHourlyWeek } from "@/lib/types/attendance"; // Ensure this path is correct

const hours = [
  "8:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00 (Break)",
  "14:00 - 16:00",
  "16:00 - 18:00",
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function getColorIntensity(value: number) {
  if (value >= 95) return "bg-green-600";
  if (value >= 90) return "bg-green-500";
  if (value >= 85) return "bg-green-400";
  if (value >= 80) return "bg-yellow-400";
  if (value >= 75) return "bg-orange-400";
  return "bg-red-400";
}

interface AttendanceHeatmapProps {
  data: AttendanceHourlyWeek[];
}

export function AttendanceHeatmap({ data }: AttendanceHeatmapProps) {
  const attendanceMap: {
    [day: string]: { [hour_range: string]: number };
  } = {};

  data.forEach((dayEntry) => {
    attendanceMap[dayEntry.day] = {};
    dayEntry.hourly_data.forEach((hourData) => {
      attendanceMap[dayEntry.day][hourData.hour_range] = hourData.attendance;
    });
  });

  console.log("Transformed Attendance Map:", attendanceMap); // For debugging

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-1 text-xs">
        {/* Empty div for top-left corner */}
        <div></div>
        {/* Render day headers */}
        {days.map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}

        {/* Render hours (rows) and their corresponding daily data (cells) */}
        {hours.map((hour) => (
          <div key={hour} className="contents">
            {/* Hour label */}
            <div
              className={`text-right pr-2 font-medium ${
                hour.includes("Break") ? "text-blue-500 italic" : ""
              }`}
            >
              {hour}
            </div>

            {/* Daily cells for this hour */}
            {days.map((day) => {
              // Check if it's the break hour
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

              // Retrieve the attendance value from the transformed map
              // Use .get() or optional chaining with default for safety
              const value = attendanceMap[day]?.[hour] ?? 0; // Default to 0 if data not found

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
