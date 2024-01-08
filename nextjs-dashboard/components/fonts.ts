import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary', // it will be used in tailwindcss theme
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-secondary', // it will be used in tailwindcss theme
});

export const primaryFont = inter.className;
export const secondaryFont = robotoMono.className;

export const primaryFontStyle = inter.style;
export const secondaryFontStyle = robotoMono.style;
