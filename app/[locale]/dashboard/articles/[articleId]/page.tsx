import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import { Metadata } from 'next';
import { getArticle } from '@/server/queries/article.queries';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';
import { notFound } from 'next/navigation';
import Text from '@/components/typography/Text';
import Card from '@/components/Card';
import { titleCase } from "string-ts";
import { cache } from 'react';
import Container from '@/components/Container';
import { getArticleCategoriesOptions } from '@/utils/article.utils';
import { getSelectOptionByValue } from '@/utils/app.utils';
import ArticleMoreMenus from '@/containers/articles/ArticleMoreMenus';
import TranslationClientProvider from '@/components/TranslationClientProvider';

const getCachedArticle = cache(async (articleId: string) => {
  const article = await getArticle(articleId) as Parse.Object | undefined;
  return article;
})

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type Props = {
  params: {
    locale: Locale;
    articleId: string;
  };
};

export const generateMetadata = async ({ params: { articleId }}: Props): Promise<Metadata> => {
  const article = await getCachedArticle(articleId);

  if (!article) return {};

  return {
    title: titleCase(article.get('title')),
    description: article.get('description') || article.get('content'),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
const ArticlePage = async ({ params: { locale, articleId } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Article');

  const article = await getCachedArticle(articleId);

  if (!article) {
    notFound();
  }

  const categoriesOptions = getArticleCategoriesOptions(t);
  const categories = article.get('categories')?.map((category: string) => getSelectOptionByValue(categoriesOptions, category, 'label'));

  return (
    <Container className="flex flex-col">
      <div className="self-stretch flex flex-row justify-between">
        <Breadcrumbs
          segments={[
            {
              title: 'Articles',
              href: (ROUTES.private.articles as any).root,
            },
            {
              title: article.get('title'),
              href: ROUTES.private.articles.preview(article.id),
            },
          ]}
        />
        {/* pass the translated key from the server to a client component */}
        <TranslationClientProvider rootKeys={['Common', 'Article']}>
          <ArticleMoreMenus articleId={article.id} currentAction="preview" />
        </TranslationClientProvider>
      </div>

      <Card className="md:w-full self-stretch" contentClassName="space-y-3">
        <div className="flex flex-row items-center gap-6">
          <Text as="span" className="font-bold">{t('title')}</Text>
          <Text as="span">{article.get('title')}</Text>
        </div>
        {article.has('categories') && article.get('categories').length > 0 && (
          <div className="flex flex-row items-center gap-12">
            <Text as="span" className="font-bold">{t('categories')}</Text>
            <Text as="span">{categories.join(', ')}</Text>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ArticlePage;
