'use server';

import { collections } from '@/utils/constants';
import { catchError } from '@/utils/utils';

import { IServerActionResponse } from '@/types/app.type';
import { IArticle } from '@/types/article.type';

export const getArticles = async (): Promise<
  IServerActionResponse<IArticle[]>
> => {
  try {
    const query = new global.Parse.Query(collections.Article);
    const articles = await query.find();
    const articlesJson = articles.map((article: Parse.Attributes) =>
      article.toJSON(),
    );
    return {
      success: true,
      data: articlesJson,
    };
  } catch (e) {
    const error = catchError(e);
    return error;
  }
};
