import { getArticles } from '@/server/queries/article.queries';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Text from '@/components/typography/Text';
import { Locale } from '@/config/i18n';
import Articles from '@/containers/articles/Articles';
import { Metadata } from 'next';
import Pagination from '@/components/Pagination';
import { getPaginatedQuery } from '@/utils/app.utils';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';
import { PAGINATION } from '@/utils/constants';
import { paginationSearchParamsSchema } from '@/validations/app.validations';

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
const perPage = PAGINATION.perPage;

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
  const parsedSearchParams = paginationSearchParamsSchema.parse(searchParams);
  const page = parseInt(parsedSearchParams.page, 10) || 1;

  const t = await getTranslations('Article')

  // preload the data from server
  const data = await getArticles(getPaginatedQuery(perPage, page));

  return (
    <div className="space-y-4">
      <Breadcrumbs
        segments={[
          {
            title: 'Articles',
            href: (ROUTES.articles as any).root,
          },
        ]}
      />
      {(data as any).error ? (
        <Text>{(data as any).error}</Text>
      ) : (
        <>
          <Articles
            tErrorDeletion={t('message.error.deleted')}
            articles={(data as any).articles}
          />
          <Pagination
            page={page}
            total={(data as any).count}
            perPage={perPage}
            className="mt-4"
          />   
        </>
      )}
    </div>
  );
};

export default ArticlesPage;
