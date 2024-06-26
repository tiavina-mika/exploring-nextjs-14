'use server';

import { SafeAction } from 'next-safe-action';

import { action } from '@/config/safeAction';
import { ArticleSchema, EditArticleSchema } from '@/validations/article.validations';
import { collections } from '@/utils/constants';
import { setValues } from '@/utils/parse.utils';

import { IArticle } from '@/types/article.type';

import { getArticle } from '../queries/article.queries';
import { ROUTES } from '@/config/routes';
import { revalidatePath } from 'next/cache';
import { idSchema } from '@/validations/app.validations';

const ARTICLE_PROPERTIES = new Set<string>(['title', 'active', 'categories']);

const Article = Parse.Object.extend(collections.Article);

export const createArticle = action(
  ArticleSchema,
  async (values): Promise<SafeAction<typeof ArticleSchema, IArticle>> => {
    const article = new Article();

    setValues(article, values, ARTICLE_PROPERTIES);
    const savedArticle = await article.save();
    return savedArticle.toJSON();
  },
);

export const editArticle = action(EditArticleSchema,
  async (
    values,
  ): Promise<SafeAction<typeof EditArticleSchema, IArticle> | undefined> => {

    const article = await getArticle(values.id);

    if (!article) return;

    const newValues = {
      ...values,
      active: !!values.active,
    };

    setValues(article, newValues, ARTICLE_PROPERTIES);
    const savedArticle = await (article as Parse.Attributes).save();

    // reload cache
    revalidatePath(ROUTES.private.articles.root)
    revalidatePath(ROUTES.private.articles.edit(savedArticle.id).pathname)
    revalidatePath(ROUTES.private.articles.preview(savedArticle.id).pathname)
    return savedArticle.toJSON();
  }
);

export const deleteArticle = action(idSchema,
  async (id): Promise<SafeAction<typeof idSchema, string> | undefined> => {
    const article = await getArticle(id);

    if (!article) return;

    const deletedArticle = await (article as Parse.Attributes).destroy();

    revalidatePath(ROUTES.private.articles.root);
    return deletedArticle.id;
  }
);
