import { getArticle } from '@/server/queries/article.queries';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Locale } from '@/config/i18n';
import ArticleFormProvider from '@/containers/articles/form/ArticleFormProvider';
import { notFound } from 'next/navigation';
import { IArticle } from '@/types/article.type';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';

type Props = {
  params: {
    locale: Locale;
    articleId: string;
  };
};

const EditArticlePage = async ({ params: { locale, articleId } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('Common');

  const article = await  getArticle(articleId, true);

  if (!article) {
    notFound();
  }

  return (
    <>
      <div>
        <Breadcrumbs
          segments={[
            {
              title: 'Articles',
              href: (ROUTES.articles as any).root,
            },
            {
              title: t('edit') + ' ' + (article as IArticle).title,
              href: ROUTES.articles.preview((article as IArticle).objectId),
            },
          ]}
        />
      </div>
      <div>
        <ArticleFormProvider article={article as IArticle} />
      </div>
    </>
  );
};

export default EditArticlePage;
