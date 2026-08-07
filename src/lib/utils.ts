import { clsx, type ClassValue } from "clsx";
import { twMerge } from 'tailwind-merge';

//Tailwaing Merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}