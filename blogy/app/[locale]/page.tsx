import env from '@/env';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import LanguageSwitcher from '@/components/languages/LanguageSwitcher';
import ToggleTheme from '@/components/ToggleTheme';
import { Locale } from '@/config/i18n';
import { getIsResponsiveScreens } from '@/server/responsive.server';

type Props = {
  params: {
    locale: Locale;
  };
};

const HomePage = ({ params: { locale } }: Props) => {
  // const t = useTranslations('Common');

  console.log('SERVER', env.SERVER);
  console.log('NEXT_PUBLIC_CLIENT', env.NEXT_PUBLIC_CLIENT);
  unstable_setRequestLocale(locale);


  return (
    <main className="flex min-h-screen flex-col p-6">
      <div>
        <ToggleTheme />
      </div>
      <div>
        <LanguageSwitcher />
      </div>
      {/* <div>{t('greeting')}</div> */}
    </main>
  );
};

export default HomePage;
