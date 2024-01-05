import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `clsx` is a tiny utility for constructing className strings conditionally.
 * `cn` function is a small extension for `clsx` to implement better support for TailwindCSS classes.
 * ref: https://www.youtube.com/watch?v=re2JFITR7TI
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}