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
      className={cn(titleVariants({ color }), className, 'dark:text-white')}
      {...props}
    >
      {children}
    </Heading>
  ),
);

export default Title;
