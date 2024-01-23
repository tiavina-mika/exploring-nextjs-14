import { string } from 'zod';
import { zfd } from 'zod-form-data';

import { errorMap } from '@/config/zod';

export const getArticleSchema = (tForm?: any, tArticle?: any) => {
  return zfd.formData({
    title: zfd.text(
      string({ errorMap })
        .min(1, tForm('error.required', { field: tArticle('title') }))
        .max(3, tForm('error.max', { field: tArticle('title'), number: 75 })),
    ),
  })
};
