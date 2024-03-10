import { getArticles } from '@/server/queries/article.queries';
import { QueryClient } from '@tanstack/query-core';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Text from '@/components/typography/Text';
import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import Articles from '@/containers/articles/Articles';
import ReactQueryServerHydration from '@/providers/ReactQueryServerHydration';
import { Metadata } from 'next';
import Pagination from '@/components/Pagination';
import { getPaginatedQuery } from '@/utils/app.utils';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type MetaDataProps = {
  params: { locale: Locale }
}

export const generateMetadata = async ({ params: { locale }}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    title: t('articles.metaTitle'),
    description: t('articles.metaDescription'),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
type Props = {
  params: {
    locale: Locale;
  };
  searchParams : {
    page: string;
  }
};

const ArticlesPage = async ({ params: { locale }, searchParams }: Props) => {
  unstable_setRequestLocale(locale);
  const perPage = 1;
  const page = parseInt(searchParams.page, 10) || 1;

  const t = await getTranslations('Article')

  const queryClient = new QueryClient();

  // preload the data from server
  await queryClient.prefetchQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles(getPaginatedQuery(perPage, page)),
  });

  const data = queryClient.getQueryData(['articles']) as any;

  return (
    <>
      <div>
        <Title>List of articles</Title>
      </div>
      {data.error ? (
        <Text>{data.error}</Text>
      ) : (
        <ReactQueryServerHydration queryClient={queryClient}>
          {/* we do not need to pass the props */}
          <Articles
            tErrorDeletion={t('message.error.deleted')}
            page={page}
            perPage={perPage}
          />
          <Pagination
            page={page}
            total={data.count}
            perPage={perPage}
          />
        </ReactQueryServerHydration>
      )}
    </>
  );
};

export default ArticlesPage;
