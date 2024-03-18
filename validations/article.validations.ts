import { array, boolean, object, string } from 'zod';

import { errorMap } from '@/config/zod';
import { MultipleSelectSchema, idSchema } from './app.validations';

export const ArticleSchema = object({
	title: string({ errorMap })
      .min(1, 'error.required'),
  active: boolean().optional(),
	categories: array(MultipleSelectSchema).min(1, "error.required")
})

export const EditArticleSchema = ArticleSchema.extend({
  // add id to edit in form values
  // the name should be exactly "id" because we need it in the error key translated message
  id: idSchema,
});

