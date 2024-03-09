import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import { Metadata } from 'next';
import { getArticle } from '@/server/queries/article.queries';

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
    title: article.get('title'),
    description: article.get('description') || article.get('content'),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //


const ArticlePage = ({ params: { locale, articleId } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <>
      <div>
        <Title>Article preview {articleId}</Title>
      </div>
    </>
  );
};

export default ArticlePage;
