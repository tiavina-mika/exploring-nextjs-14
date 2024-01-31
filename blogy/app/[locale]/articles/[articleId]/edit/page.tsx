import { getArticle } from '@/server/queries/article.queries';
import { QueryClient } from '@tanstack/query-core';
import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import ArticleFormProvider from '@/containers/articles/form/ArticleFormProvider';
import ReactQueryServerHydration from '@/providers/ReactQueryServerHydration';

type Props = {
  params: {
    locale: Locale;
    articleId: string;
  };
};

const EditArticlePage = async ({ params: { locale, articleId } }: Props) => {
  unstable_setRequestLocale(locale);

  const queryClient = new QueryClient();

  // preload the data from server
  await queryClient.prefetchQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticle(articleId, true),
  });

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Title>Edit Article {articleId}</Title>
      </div>
      <div>
        <ReactQueryServerHydration queryClient={queryClient}>
          <ArticleFormProvider id={articleId} />
        </ReactQueryServerHydration>
      </div>
    </main>
  );
};

export default EditArticlePage;
