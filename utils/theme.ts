// tailwindcss default theme: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js#L773
const defaultTheme = require('tailwindcss/defaultTheme');

export const theme = {
  colors: {
    primary: {
      light: '#86efac',
      DEFAULT: '#22c55e',
      dark: '#166534',

      // shadcn
      foreground: 'hsl(var(--primary-foreground))',
    },
    secondary: {
      light: '#c084fc',
      DEFAULT: '#00112c',
      dark: '#581c87',

      // shadcn
      foreground: 'hsl(var(--secondary-foreground))',
    },
    error: {
      light: '#fee2e2',
      DEFAULT: '#dc2626',
      dark: '#991b1b',
    },
    warning: {
      light: '#ffedd5',
      DEFAULT: '#ea580c',
      dark: '#c2410c',

      'warning-foreground': 'hsl(var(--warning-foreground))',
    },
    success: {
      light: '#dcfce7',
      DEFAULT: '#16a34a',
      dark: '#15803d',
    },
    info: {
      light: '#dbeafe',
      DEFAULT: '#2563eb',
      dark: '#1e40af',
    },
    default: {
      light: '#00112c',
      DEFAULT: '#00112c',
      dark: '#00112c',
    },
    // shadcn theme
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'var(--background)',
    // background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))',
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    borderRadius: {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      lg: 'var(--radius)',
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      md: 'calc(var(--radius) - 2px)',
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      sm: 'calc(var(--radius) - 4px)',
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

  // shadcn
  keyframes: {
    'accordion-down': {
      from: { height: '0px' },
      to: { height: 'var(--radix-accordion-content-height)' },
    },
    'accordion-up': {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0px' },
    },
  },
  // shadcn
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
  },
  // this is used in viewports.utils.ts for storybook
  screens: {
    'xs': '360px',
    ...defaultTheme.screens,
  },
  // tailwind default viewport breakpoints
  /*
  screens: {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
  }
  */
};
