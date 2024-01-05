import { Inter, Roboto_Mono  } from 'next/font/google';
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-primary', // it will be used in tailwindcss theme
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-secondary', // it will be used in tailwindcss theme
})

export const primaryFont = inter.className;
export const secondaryFont = roboto_mono.className;

export const primaryFontStyle = inter.style;
export const secondaryFontStyle = roboto_mono.style;
