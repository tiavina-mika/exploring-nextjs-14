import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import ArticleFormProvider from '@/containers/articles/form/ArticleFormProvider';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';

type Props = {
  params: {
    locale: Locale;
  };
};

const AddArticlePage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Article');

  return (
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumbs
          segments={[
            {
              title: 'Articles',
              href: (ROUTES.articles as any).root,
            },
            {
              title: t('create'),
              href: (ROUTES.articles as any).add,
            },
          ]}
        />
      </div>
      <div>
        <ArticleFormProvider />
      </div>
    </div>
  );
};

export default AddArticlePage;
