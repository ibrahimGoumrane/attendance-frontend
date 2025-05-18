import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ErrorState {
  errors?: Record<string, string[]>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage({ errors }: ErrorState, field: string) {
  if (errors && field in errors) {
    return errors[field][0];
  }
  return "";
}
export const formatDatetimeLocal = (datetimeString: string) => {
  const date = new Date(datetimeString);
  return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
};
