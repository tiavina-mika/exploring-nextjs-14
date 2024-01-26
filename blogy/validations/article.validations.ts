import { string } from 'zod';
import { zfd } from 'zod-form-data';

import { errorMap } from '@/config/zod';

export const ArticleSchema = zfd.formData({
  title: zfd.text(
    string({ errorMap })
      // .min(1, tForm('error.required', { field: tArticle('title') }))
      // .max(3, tForm('error.max', { field: tArticle('title'), number: 75 })),
      .min(1, 'error.required')
      .max(3, 'error.tooLong'),
  ),
});
