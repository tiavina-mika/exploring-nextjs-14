import plugin from 'tailwindcss/plugin';
import { customizeElements, theme } from './utils/theme';

const config = {
  // the dark mode is applied if <html class="dark"></html> instead of the OS dark mode
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: theme,
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function({ addComponents, addBase, theme }) {
      addBase(customizeElements(theme))
      // addComponents(customizeClass(theme))
    })
  ],
};
export default config;
