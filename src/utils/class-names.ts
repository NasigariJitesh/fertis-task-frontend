import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 *
 * @param {...any} inputs
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
