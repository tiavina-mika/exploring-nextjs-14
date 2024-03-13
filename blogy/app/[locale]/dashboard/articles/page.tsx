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
import SortArticles from '@/containers/articles/SortArticles';
import { ISearchParams, ISelectOption } from '@/types/app.type';

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
  searchParams : ISearchParams;
};

const ArticlesPage = async ({ params: { locale }, searchParams }: Props) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Common');
  const tArticle = await getTranslations('Article');

  const parsedSearchParams = paginationSearchParamsSchema.parse(searchParams);
  const page = parseInt(parsedSearchParams.page, 10) || 1;
  const field = parsedSearchParams.field || 'updatedAt';
  const order = parsedSearchParams.order || 'asc';

  const options: ISelectOption<string>[] = [
    {
      label: t('newest'),
      value: 'updatedAt',
    },
    {
      label: tArticle('title'),
      value: 'title',
    },
  ];

  // preload the data from server
  const data = await getArticles(getPaginatedQuery({
    perPage,
    page,
    field,
    order,
  }));

  return (
    <div className="space-y-4">
      <div>
        <Breadcrumbs
          segments={[
            {
              title: 'Articles',
              href: (ROUTES.articles as any).root,
            },
          ]}
        />
        <SortArticles searchParams={parsedSearchParams} options={options} />
      </div>
      {(data as any).error ? (
        <Text>{(data as any).error}</Text>
      ) : (
        <>
          <Articles
            tErrorDeletion={tArticle('message.error.deleted')}
            articles={(data as any).articles}
          />
          <Pagination
            page={page}
            total={(data as any).count}
            perPage={perPage}
            className="mt-4"
            searchParams={parsedSearchParams}
          />   
        </>
      )}
    </div>
  );
};

export default ArticlesPage;
