import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import { Metadata } from 'next';
import { ROUTES } from '@/config/routes';

import { ISearchParams } from '@/types/app.type';
import PaginatedArticles from '@/containers/articles/PaginatedArticles';

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
  searchParams : ISearchParams;
};

const ArticlesPage = async ({ params: { locale }, searchParams }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <PaginatedArticles
      breadcrumbs={[
        {
          title: 'Articles',
          href: (ROUTES.articles as any).root,
        },
      ]}
      searchParams={searchParams}
    />
  );
};

export default ArticlesPage;
