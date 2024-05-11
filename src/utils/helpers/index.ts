import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const range = (start: number, end: number) => {
  return Array.from({ length: +(end - start + 1) }, (_, idx) => idx + start);
};

export const RES = (results: any, count?: number) => ({
  error: false,
  count,
  results,
});
export const ERROR = (message: string) => ({ error: { message } });
