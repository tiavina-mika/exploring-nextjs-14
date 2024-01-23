'use server';

import { setFormDataValues } from '@/utils/parse.utils';

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
  _: IArticle | null,
  values: FormData,
): Promise<IArticle> => {
  const article = new Article();
  // const currentUser = await Parse.User.currentAsync();

  setFormDataValues(article, values, ARTICLE_PROPERTIES);
  const savedArticle = await article.save();
  return savedArticle.toJSON();
};
