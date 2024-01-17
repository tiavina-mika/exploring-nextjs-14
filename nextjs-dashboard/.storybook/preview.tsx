import React from 'react';
import type { Preview } from '@storybook/react';

import ThemeProvider from '../components/ThemeProvider';

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
  },
  decorators: [
    (Story, context) => {
      return (
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
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'system',
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
  },
};

export default preview;
