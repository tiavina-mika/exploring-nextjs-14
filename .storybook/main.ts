import path from 'path';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  'stories': [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/**/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/**/**/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  'framework': {
    'name': '@storybook/nextjs',
    'options': {},
  },
  'docs': {
    'autodocs': 'tag',
  },
  staticDirs: ['../public'], //👈 Configures the static asset folder in Storybook
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.alias ??= {};
    config.resolve.alias['@'] = path.resolve(__dirname, '..');
    return config;
  },
};
export default config;
