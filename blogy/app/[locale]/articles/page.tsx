import { getArticles } from '@/server/queries/article.queries';
import { QueryClient } from '@tanstack/query-core';
import { unstable_setRequestLocale } from 'next-intl/server';

import Text from '@/components/typography/Text';
import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import Articles from '@/containers/articles/Articles';
import ReactQueryServerHydration from '@/providers/ReactQueryServerHydration';

type Props = {
  params: {
    locale: Locale;
  };
};

const ArticlesPage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const queryClient = new QueryClient();

  // preload the data from server
  await queryClient.prefetchQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const data = queryClient.getQueryData(['articles']) as any;

  return (
    <main>
      <div>
        <Title>List of articles</Title>
      </div>
      {!data.success ? (
        <Text>{data.message}</Text>
      ) : (
        <ReactQueryServerHydration queryClient={queryClient}>
          {/* we do not need to pass the props */}
          <Articles />
        </ReactQueryServerHydration>
      )}
    </main>
  );
};

export default ArticlesPage;
