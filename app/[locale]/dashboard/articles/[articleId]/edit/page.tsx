import { getArticle } from '@/server/queries/article.queries';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import ArticleFormProvider from '@/containers/articles/form/ArticleFormProvider';
import { notFound } from 'next/navigation';
import { IArticle } from '@/types/article.type';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';
import { cache } from 'react';
import { Metadata } from 'next';
import { titleCase } from 'string-ts';

const getCachedArticle = cache(async (articleId: string) => {
  const article = await getArticle(articleId, true) as IArticle | undefined;
  return article;
})

type Props = {
  params: {
    locale: Locale;
    articleId: string;
  };
};

export const generateMetadata = async ({ params: { articleId, locale }}: Props): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Common',
  });

  const article: IArticle | undefined = await getCachedArticle(articleId);

  if (!article) return {};

  return {
    title: t('edit') + ' ' + titleCase(article.title),
    description: article.description || article.content,
  };
}

const EditArticlePage = async ({ params: { locale, articleId } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Common');

  const article = await  getCachedArticle(articleId);

  if (!article) {
    notFound();
  }

  return (
    <>
      <div>
        <Breadcrumbs
          segments={[
            {
              title: 'Articles',
              href: (ROUTES.articles as any).root,
            },
            {
              title: t('edit') + ' ' + article.title,
              href: ROUTES.articles.preview(article.objectId),
            },
          ]}
        />
      </div>
      <div>
        <ArticleFormProvider article={article as IArticle} />
      </div>
    </>
  );
};

export default EditArticlePage;
