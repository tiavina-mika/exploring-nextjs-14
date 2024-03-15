import { string } from 'zod';
import { zfd } from 'zod-form-data';

import { errorMap } from '@/config/zod';

// the main schema used for creation and edition
const Schema = {
  title: zfd.text(
    string({ errorMap })
      // .min(1, tForm('error.required', { field: tArticle('title') }))
      // .max(3, tForm('error.max', { field: tArticle('title'), number: 75 })),
      .min(1, 'error.required')
      .max(100, 'error.tooLong'),
  ),
  active: zfd.checkbox({ trueValue: "true" }),
}
export const ArticleSchema = zfd.formData(Schema);
export const EditArticleSchema = zfd.formData({
  ...Schema,
  // add id to edit in form values
  // the name should be id beacause we need it in the error key translated message
  id: zfd.text(string({ errorMap }).min(1, 'error.dataNotExist')),
});

export const idSchema = string({ errorMap }).min(1, 'error.dataNotExist');
