'use server';

import { getTranslations } from 'next-intl/server';

import { collections } from '@/utils/constants';

import { IPaginationQuery, IServerResponse } from '@/types/app.type';
import { IArticle } from '@/types/article.type';
import { locales } from '@/config/i18n';
import { getAbsoluteUrl } from '@/utils/app.utils';
import { MetadataRoute } from 'next';
import { ROUTES, translatedRoutes } from '@/config/routes';
import { retrievePathnameFromDynamicPathname } from '@/utils/next.utils';

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

/**
 * generate sitemap for all articles
 * it's used in sitemap.ts
 * @returns
 */
export const generateArticlesSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const siteMaps: MetadataRoute.Sitemap = [];

  const articlesPath = retrievePathnameFromDynamicPathname(ROUTES.articles.preview().pathname)

  await new Parse.Query(collections.Article)
  .each(async (article: Parse.Object) => {
    locales.forEach((locale) => {
      // [ROUTES.articles.preview().pathname][locale]

      siteMaps.push({
        url: getAbsoluteUrl(`/${locale}${articlesPath}${article.id}`),

        lastModified: article.updatedAt,
      });
    })
  })

  return siteMaps;
}
