import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import Title from '@/components/typography/Title';
import { Locale } from '@/config/i18n';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Container from '@/components/Container';
import Text from '@/components/typography/Text';
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
    title: t('faq.metaTitle', { appName: APP_NAME }),
    description: t('faq.metaDescription'),
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

const FaqPage = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Faqs');
  const tFaq = useTranslations('Faq');

  // Set items according to the "faq"
  // entries in your en.json file
  const items = [1, 2, 3] as const;

  type FaqNumber = (typeof items)[number];
  type TranslationKeys =
    | `${FaqNumber}.summary`
    | `${FaqNumber}.details`;

  return (
    <Container className="flex flex-col gap-8 pb-0 md:pb-10">
      <div className="self-stretch flex justify-center pt-3 md:py-10">
        <Title>
          {tFaq('faq')}
        </Title>
      </div>
      <div className="flex flex-col gap-6 md:gap-10">
        {items.map((item: number, index: number) => {
          const summaryKey = `${item}.summary` as TranslationKeys;
          const detailsKey = `${item}.details` as TranslationKeys;

          return (
            <div key={item + "-" + index} className="self-stretch flex flex-col gap-3">
              <Title level="h2">
                {item}. {t(summaryKey)}
              </Title>
              <div>
                <Text className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
                  {t(detailsKey)}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default FaqPage;
