'use server';

import { getTranslations } from 'next-intl/server';

import { collections } from '@/utils/constants';

import { IServerResponse } from '@/types/app.type';
import { IArticle } from '@/types/article.type';

export const getArticle = async (
  id: string,
  toJson = false,
): Promise<IServerResponse<IArticle | Parse.Object | undefined>> => {
  try {
    const t = await getTranslations('Article');
    const article = await new Parse.Query(collections.Article)
      .equalTo('objectId', id)
      .first();

    if (!article) {
      throw new Error(t('message.error.notFound'));
    }

    if (toJson) {
      return (article as Parse.Attributes).toJSON();
    }

    return article;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

type ArticlePaginationInput = {
  limit: number;
  skip: number;
}
export const getArticles = async ({ limit, skip }: ArticlePaginationInput): Promise<IServerResponse<{ articles: IArticle[], count: number }>> => {
  try {
    const query = new Parse.Query(collections.Article)
      .limit(limit)
      .skip(skip)
      .descending('updatedAt');

    const result = await query.withCount().find() as any;
    const articles = result.results as Parse.Attributes[];
    const articlesJson = articles.map((article: Parse.Attributes) =>
      article.toJSON(),
    );

    return {
      articles: articlesJson,
      count: result.count
    };
  } catch (e) {
    return { error: (e as Error).message };
  }
};
