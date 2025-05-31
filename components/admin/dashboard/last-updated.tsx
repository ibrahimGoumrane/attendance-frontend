"use client";

import { Clock } from "lucide-react";

export const LastUpdated = () => {
  const date = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  });
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock className="h-4 w-4" />
      Last updated: {date}
    </div>
  );
};
