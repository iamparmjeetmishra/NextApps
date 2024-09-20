import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function AvatarWord(input: string) {
  return input.charAt(0).toUpperCase()
}

export function CapitalizeFirstWord(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1)
}