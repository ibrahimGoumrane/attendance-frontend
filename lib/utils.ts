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
