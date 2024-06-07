import { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/app.utils';

import { ButtonPaletteColor, TitleLevelType } from '@/types/component.type';

export const titleVariants = cva('font-primary', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-success',
      error: 'text-error',
      info: 'text-info',
      warning: 'text-warning',
      default: 'text-default',
    },
  },
  defaultVariants: {
    color: "default",
  },
});
// --------- types --------- //
export type TitleProps = {
  level?: TitleLevelType;
  children: ReactNode;
  color?: ButtonPaletteColor;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants>;

const Title = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement> & TitleProps
>(
  (
    { children, color = 'default', className, level: Heading = 'h1', ...props },
    ref,
  ) => (
    <Heading
      ref={ref}
      className={cn(
        titleVariants({ color }),
        className,
        'dark:text-white',
        /**
         * mobile size, for mobile+, it's defined in theme
         * because there is no way to define responsive font-size there
         * @see /utils/theme.ts
         */
        {
          'md:text-4xl text-3xl': Heading === 'h1',
          'md:text-3xl text-xl': Heading === 'h2',
          'md:text-2xl text-lg': Heading === 'h3',
          'md:text-xl text-base': Heading === 'h4',
          'md:text-lg text-sm': Heading === 'h5',
          'md:text-base text-xs': Heading === 'h6',
        }
      )}
      {...props}
    >
      {children}
    </Heading>
  ),
);

export default Title;
