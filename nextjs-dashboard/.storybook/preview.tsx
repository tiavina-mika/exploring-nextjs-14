import React from 'react';
import type { Preview } from '@storybook/react';
import en from "../translations/en.json";
import fr from "../translations/fr.json";

import ThemeProvider from '../components/ThemeProvider';
import { defaultLocale, storybookLocalesOptions } from '../config/i18n';
import { NextIntlClientProvider } from 'next-intl';
import '../app/globals.css';

// get the selected messages (json) for the locale
const getLanguage = (locale: string) => {
  switch (locale) {
    case 'en':
      return en;
    case 'fr':
      return fr;
    default:
      return fr;
  }
}
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true
    },
  },
  
  decorators: [
    (Story, context) => {
      return (
        <NextIntlClientProvider locale={context.globals.locale} messages={getLanguage(context.globals.locale)}>
          <ThemeProvider
            attribute="class"
            forcedTheme={context.globals.theme}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
          </ThemeProvider>
        </NextIntlClientProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        // Array of plain string values or MenuItem shape (see below)
        items: ['light', 'dark', 'system'],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Global language for components',
      defaultValue: defaultLocale,
      toolbar: {
        // The label to show for this toolbar item
        title: 'Language',
        icon: 'globe',
        // Array of plain string values or MenuItem shape (see below)
        items: storybookLocalesOptions,
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
