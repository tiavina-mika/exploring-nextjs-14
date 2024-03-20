import { array, boolean, object, string } from 'zod';

import { idSchema } from './app.validations';

export const ArticleSchema = object({
	title: string()
      .min(1)
      .max(2),
  active: boolean().optional(),
	categories: array(string()).min(1)
})

export const EditArticleSchema = ArticleSchema.extend({
  // add id to edit in form values
  // the name should be exactly "id" because we need it in the error key translated message
  id: idSchema,
});

