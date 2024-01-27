'use server';

import { ArticleSchema } from '@/validations/article.validations';
import { setValues } from '@/utils/parse.utils';
import { catchError } from '@/utils/utils';

import { IServerActionResponse } from '@/types/app.type';
import { IArticle } from '@/types/article.type';

const ARTICLE_PROPERTIES = new Set<string>(['title']);

const Article = Parse.Object.extend('Article');

/**
 *
 * @param _ prevState (initial values)
 * @param values form values
 * @returns
 */
export const createArticle = async (
  _: IServerActionResponse<IArticle> | null,
  values: FormData,
): Promise<IServerActionResponse<IArticle>> => {
  try {
    const parsedData = ArticleSchema.parse(values);
    const article = new Article();
    // const currentUser = await Parse.User.currentAsync();

    setValues(article, parsedData, ARTICLE_PROPERTIES);
    const savedArticle = await article.save();
    return {
      success: true,
      data: savedArticle.toJSON(),
    };
  } catch (e) {
    const error = catchError(e);
    return error;
  }
};
