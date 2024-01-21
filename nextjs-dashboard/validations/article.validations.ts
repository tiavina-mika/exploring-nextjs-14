import { object, string } from 'zod';

import { errorMap } from '@/config/zod';

export const ArticleSchema = (tForm?: any, tArticle?: any) =>
  object({
    title: string({ errorMap })
      .min(1, tForm('error.required', { field: tArticle('title') }))
      .max(75, tForm('error.max', { field: tArticle('title'), number: 75 })),
  });
