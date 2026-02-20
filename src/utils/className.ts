import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const CN = (...inputs: any) => twMerge(clsx(inputs));