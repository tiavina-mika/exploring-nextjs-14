import { getArticles } from '@/server/queries/article.queries';
import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import Articles from '@/containers/articles/Articles';

import { IArticle } from '@/types/article.type';

type Props = {
  params: {
    locale: Locale;
  };
};

const ArticlesPage = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  const articles = await getArticles();

  return (
    <main>
      <div>
        <Title>List of articles</Title>
      </div>
      <div>
        <Articles articles={articles as IArticle[]} />
      </div>
    </main>
  );
};

export default ArticlesPage;
