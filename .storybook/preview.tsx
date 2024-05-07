import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import ThemeProvider from '../providers/ThemeProvider';
import { defaultLocale, storybookLocalesOptions } from '../config/i18n';
import { customViewports } from '../utils/viewports.utils';
import { getTranslatedMessages } from '../utils/translation.utils';

import '../app/globals.css';

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
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
        ...INITIAL_VIEWPORTS,
      },
      // list of viewports to configure:
      // https://github.com/storybookjs/storybook/blob/next/code/addons/viewport/src/defaults.ts
      defaultViewport: 'iphone14',
    },
  },

  decorators: [
    (Story, context) => {
      return (
        <NextIntlClientProvider locale={context.globals.locale} messages={getTranslatedMessages(context.globals.locale)}>
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
