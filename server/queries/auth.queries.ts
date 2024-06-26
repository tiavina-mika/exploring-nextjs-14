'use server';

import { getTranslations } from 'next-intl/server';

import { collections } from '@/utils/constants';

import { IServerResponse } from '@/types/app.type';
import { IArticle } from '@/types/article.type';

export const getUser = async (
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

export const checkIfUserExists = async (email: string): Promise<boolean> => {
  const isUserExists = await Parse.Cloud.run('checkIfUserExists', { email });
  return isUserExists;
}
