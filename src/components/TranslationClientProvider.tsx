'use client';

import { ReactNode } from 'react';

import en from '@/translations/en.json';
import fr from '@/translations/fr.json';
import pick from 'lodash/pick';
import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useLocale,
} from 'next-intl';

import { defaultLocale, Locale } from '@/config/i18n';

// Create a mapping from locale identifiers
// to the specific imported JSON modules
const localeMessages = {
  'fr': fr,
  'en': en,
};

const getMessages = (locale: Locale, rootKeys: string[]) => {
  const messages: AbstractIntlMessages =
    (localeMessages as any)[locale] || defaultLocale;

  const values = {};
  rootKeys.forEach((key: string) => {
    (values as any)[key] = pick(messages, key)[key];
  });

  return values;
};

type Props = {
  children: ReactNode;
  rootKeys: string[];
};
const TranslationClientProvider: any = ({ children, rootKeys = [] }: Props) => {
  const locale = useLocale() as Locale;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={getMessages(locale, rootKeys)}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default TranslationClientProvider;
