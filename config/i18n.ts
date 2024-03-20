import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// used for storybook
const getLocalLabel = (locale: string) => {
  switch (locale) {
    case 'fr':
      return 'Français';
    case 'en':
      return 'English';
    default:
      return locale;
  }
};

// Can be imported from a shared config
export const locales = ['fr', 'en'] as const;
export const defaultLocale = locales[1];
export const localePrefix = 'always'; // Default

export const storybookLocalesOptions = locales.map((locale) => ({
  value: locale,
  title: getLocalLabel(locale) as string,
}));

export type Locale = (typeof locales)[number];

/**
 * load the translations json files for the given locale
 */
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: {
      ...(await import(`../translations/${locale}/app.json`)).default,
      ...(await import(`../translations/${locale}/article.json`)).default,
      ...(await import(`../translations/${locale}/auth.json`)).default,
      ...(await import(`../translations/${locale}/common.json`)).default,
      ...(await import(`../translations/${locale}/zod.json`)).default,
    },
  };
});
