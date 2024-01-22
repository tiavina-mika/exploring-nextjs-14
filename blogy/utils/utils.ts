import env from '@/env';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getAbsoluteUrl = (path?: string): string =>
  `${env.NEXT_PUBLIC_APP_URL}${path}`;
