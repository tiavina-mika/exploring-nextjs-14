import { getArticle } from '@/server/queries/article.queries';
import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import ArticleFormProvider from '@/containers/articles/form/ArticleFormProvider';
import { notFound } from 'next/navigation';
import { IArticle } from '@/types/article.type';

type Props = {
  params: {
    locale: Locale;
    articleId: string;
  };
};

const EditArticlePage = async ({ params: { locale, articleId } }: Props) => {
  unstable_setRequestLocale(locale);

  const article = await  getArticle(articleId, true);

  if (!article) {
    notFound();
  }

  return (
    <>
      <div>
        <Title>Edit Article {articleId}</Title>
      </div>
      <div>
        <ArticleFormProvider article={article as IArticle} />
      </div>
    </>
  );
};

export default EditArticlePage;
