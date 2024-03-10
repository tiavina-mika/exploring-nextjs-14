import env from '@/env';
import { IPaginationQuery } from '@/types/app.type';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getAbsoluteUrl = (path?: string): string =>
  `${env.NEXT_PUBLIC_APP_URL}${path}`;

export const getPaginatedQuery = (perPage: number, page: number): IPaginationQuery => ({ limit: perPage, skip: (page - 1) * perPage})