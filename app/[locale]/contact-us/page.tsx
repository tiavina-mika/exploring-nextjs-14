import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import ContactFormProvider from '@/containers/contact/ContactFormProvider';
import { APP_NAME } from '@/utils/constants';

// ----------------------------- //
// -------- metadata ----------- //
// ----------------------------- //
type MetaDataProps = {
  params: { locale: Locale }
}

export const generateMetadata = async ({ params: { locale }}: MetaDataProps): Promise<Metadata> => {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata',
  });

  return {
    title: t('contact.metaTitle'),
    description: t('contact.metaDescription', { appName: APP_NAME }),
  };
}

// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
type Props = {
  params: {
    locale: Locale;
  };
};

const ContactPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Contact');

  return (
    <div className="flex justify-center md:h-screen pt-0 md:pt-32">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className='flex flex-col items-center'>
          <div  className='flex flex-col self-stretch space-y-2 items-center'>
            <Title level="h2" className="text-2xl mb-3">{t('contactUs')}</Title>
            <div className="self-stretch">
              <ContactFormProvider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
