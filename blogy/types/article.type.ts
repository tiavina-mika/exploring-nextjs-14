import { z } from 'zod';

import { ArticleSchema } from '@/validations/article.validations';

export interface IArticle {
  title: string;
}

export type ArticleInput = z.infer<ReturnType<typeof ArticleSchema>>;
