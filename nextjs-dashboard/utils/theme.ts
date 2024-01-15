// tailwindcss default theme: https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js#L773
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
      DEFAULT: '#9333ea',
      dark: '#581c87',

      // shadcn
      foreground: 'hsl(var(--secondary-foreground))',
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

      'warning-foreground': 'hsl(var(--warning-foreground))',
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

    // shadcn theme
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
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
};

export const customizeElements = (theme: any) => ({
  h1: { fontSize: theme('fontSize.4xl') },
  h2: { fontSize: theme('fontSize.3xl') },
  h3: { fontSize: theme('fontSize.2xl') },
  h4: { fontSize: theme('fontSize.xl') },
  h5: { fontSize: theme('fontSize.lg') },
  h6: { fontSize: theme('fontSize.base') },
});
