import { Config } from "tailwindcss";

// tailwindcss default theme: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js#L773
export const theme = {
  colors: {
    primary: {
      light: '#86efac',
      DEFAULT: '#22c55e',
      dark: '#166534',
    },
    secondary: {
      light: '#c084fc',
      DEFAULT: '#9333ea',
      dark: '#581c87',
    },
    error: {
      light: '#f87171',
      DEFAULT: '#dc2626',
      dark: '#991b1b',
    },
    warning: {
      light: '#fb923c',
      DEFAULT: '#ea580c',
      dark: '#c2410c',
    },
    success: {
      light: '#86efac',
      DEFAULT: '#22c55e',
      dark: '#15803d',
    },
    info: {
      light: '#7dd3fc',
      DEFAULT: '#3b82f6',
      dark: '#1e40af',
    },
  },
  fontFamily: {
    primary: 'var(--font-primary)', // Adds a new `font-primary` class
    secondary: 'var(--font-secondary)', // Adds a new `font-secondary` class
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
  },
}

export const customizeElements = (theme: any) => ({
  'h1': { fontSize: theme('fontSize.4xl') },
  'h2': { fontSize: theme('fontSize.3xl') },
  'h3': { fontSize: theme('fontSize.2xl') },
  'h4': { fontSize: theme('fontSize.xl') },
  'h5': { fontSize: theme('fontSize.lg') },
  'h6': { fontSize: theme('fontSize.base') },
})
