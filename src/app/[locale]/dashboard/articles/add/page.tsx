import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import ArticleFormProvider from '@/containers/articles/form/ArticleFormProvider';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';
import Container from '@/components/Container';
import TranslationClientProvider from '@/components/TranslationClientProvider';
import ArticleMoreMenus from '@/containers/articles/ArticleMoreMenus';

type Props = {
  params: {
    locale: Locale;
  };
};

const AddArticlePage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Article');

  return (
    <Container className="flex flex-col">
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

        {/* pass the translated key from the server to a client component */}
        <TranslationClientProvider rootKeys={['Common', 'Article']}>
          <ArticleMoreMenus currentAction="create" />
        </TranslationClientProvider>
      </div>
      <div>
        <ArticleFormProvider />
      </div>
    </Container>
  );
};

export default AddArticlePage;
