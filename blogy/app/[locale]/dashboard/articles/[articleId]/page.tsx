import { unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import { Metadata } from 'next';
import { getArticle } from '@/server/queries/article.queries';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';
import { notFound } from 'next/navigation';
import Text from '@/components/typography/Text';
import Card from '@/components/Card';
import { titleCase } from "string-ts";

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
  const article = await getArticle(articleId) as Parse.Object | undefined;

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

  const article = await getArticle(articleId) as Parse.Object | undefined;

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <Breadcrumbs
        segments={[
          {
            title: 'Articles',
            href: (ROUTES.articles as any).root,
          },
          {
            title: article.get('title'),
            href: ROUTES.articles.preview(article.id),
          },
        ]}
      />
      <Card>
        <div className="flex flex-row gap-4">
          <Text as="span" className="font-medium">Title</Text>
          <Text as="span">{article.get('title')}</Text>
        </div>  
      </Card>
    </div>
  );
};

export default ArticlePage;
