import { useLocale, useTranslations } from 'next-intl';

import LanguageSwitcherSelect from '@/components/languages/LanguageSwitcherSelect';
import { Locale, locales } from '@/config/i18n';

const LanguageSwitcher = () => {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale() as Locale;

  const options = locales.map((locale: Locale) => ({
    label: t('locale', { locale }),
    value: locale,
  }));

  return <LanguageSwitcherSelect defaultValue={locale} options={options} />;
};

export default LanguageSwitcher;
