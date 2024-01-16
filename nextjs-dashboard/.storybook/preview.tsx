import React from 'react';
import type { Preview } from '@storybook/react';
import ThemeProvider from "../components/ThemeProvider";

import "../app/globals.css";

enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

const defaultTheme = ThemeEnum.DARK;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    darkMode: {
      defaultValue: defaultTheme, // Enable dark mode by default on all stories
    },
  },
};

export default preview;