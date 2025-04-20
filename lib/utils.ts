import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const STORAGE_URL = "http://localhost:8000"
export function storageUrl(path : string) {
  return STORAGE_URL + path;
}
