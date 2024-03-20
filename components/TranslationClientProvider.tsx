import { ReactNode } from 'react';

import {
  NextIntlClientProvider,
  useLocale,
  useMessages,
} from 'next-intl';

import { Locale } from '@/config/i18n';
import { pick } from 'lodash';

/**
 * get only a selected translated messages by its keys
 * so thant we doesn't have to load all the translations in the client
 * ex: get only Common, Form, ...
 * @param locale
 * @param rootKeys
 * @returns
 */
type Props = {
  children: ReactNode;
  rootKeys: string[];
};

const TranslationClientProvider: any = ({ children, rootKeys = [] }: Props) => {
  const locale = useLocale() as Locale;
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pick(messages, rootKeys)}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default TranslationClientProvider;
