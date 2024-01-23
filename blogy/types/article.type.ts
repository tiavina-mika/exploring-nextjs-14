import { Attributes } from 'parse';
import { z } from 'zod';

import { getArticleSchema } from '@/validations/article.validations';

import { DateType } from './app.type';

export interface IArticle extends Attributes {
  objectId: string;
  title: string;
  updatedAt?: DateType;
  createdAt?: DateType;
}

export type IArticleInput = z.infer<ReturnType<typeof getArticleSchema>>;
