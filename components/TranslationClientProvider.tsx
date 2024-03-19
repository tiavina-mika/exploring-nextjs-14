'use client';

import { ReactNode } from 'react';

import {
  NextIntlClientProvider,
  useLocale,
} from 'next-intl';

import { Locale } from '@/config/i18n';
import { getTranslatedMessages } from '@/utils/translation.utils';

type Props = {
  children: ReactNode;
  rootKeys: string[];
};
const TranslationClientProvider: any = ({ children, rootKeys = [] }: Props) => {
  const locale = useLocale() as Locale;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={getTranslatedMessages(locale)}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default TranslationClientProvider;
