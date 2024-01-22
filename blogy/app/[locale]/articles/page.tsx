import { unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';

type Props = {
  params: {
    locale: Locale;
  };
};

const ArticlesPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <Title>List of articles</Title>
      </div>
    </main>
  );
};

export default ArticlesPage;
