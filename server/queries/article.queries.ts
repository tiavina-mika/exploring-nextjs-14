'use server';

import { getTranslations } from 'next-intl/server';

import { collections } from '@/utils/constants';

import { IPaginationQuery, IServerResponse } from '@/types/app.type';
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

export const getArticles = async ({ limit, skip, field, order }: IPaginationQuery): Promise<IServerResponse<{ articles: IArticle[], count: number }>> => {
  try {
    const query = new Parse.Query(collections.Article)
      .limit(limit)
      .skip(skip)
    
    if (field) {
      if (order === 'asc') {
        query.ascending(field);
      } else {
        query.descending(field);
      }
    }

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
