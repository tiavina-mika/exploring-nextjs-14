import { useLocale, useTranslations } from 'next-intl';

import LanguageSwitcherSelect from '@/components/languages/LanguageSwitcherSelect';
import { Locale, locales } from '@/config/i18n';

type Props = {
  className?: string;
  inputClassName?: string;
}
const LanguageSwitcher = ({ className, inputClassName }: Props) => {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale() as Locale;

  const options = locales.map((locale: Locale) => ({
    label: t('locale', { locale }),
    value: locale,
  }));

  return (
    <LanguageSwitcherSelect
      defaultValue={locale}
      options={options}
      className={className}
      inputClassName={inputClassName}
    />
  );
};

export default LanguageSwitcher;
