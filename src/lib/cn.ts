import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine class names using clsx and tailwind-merge
 *
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
