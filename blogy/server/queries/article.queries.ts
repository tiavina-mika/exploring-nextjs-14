'use server';

import { collections } from '@/utils/constants';

import { IServerResponse } from '@/types/app.type';
import { IArticle } from '@/types/article.type';

export const getArticles = async (): Promise<IServerResponse<IArticle[]>> => {
  try {
    const query = new global.Parse.Query(collections.Article);
    const articles = await query.find();
    const articlesJson = articles.map((article: Parse.Attributes) =>
      article.toJSON(),
    );
    return articlesJson;
  } catch (e) {
    return { error: (e as Error).message };
  }
};
