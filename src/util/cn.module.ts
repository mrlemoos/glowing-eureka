import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * The type of the inputs that is passed to the `cn` function.
 */
export type Inputs = ClassValue[];

/**
 * A function that merges the given class names and returns the merged class
 * name.
 *
 * @see {@link twMerge}
 * @see {@link clsx}
 *
 * @see {@link https://npmjs.com/package/tailwindcss}
 * @see {@link https://npmjs.com/package/tailwind-merge}
 * @see {@link https://npmjs.com/package/clsx}
 */
export function cn(...inputs: Inputs): string {
  const combinedClassNames = clsx(inputs);
  const tailwindClassNames = twMerge(combinedClassNames);

  return tailwindClassNames;
}
