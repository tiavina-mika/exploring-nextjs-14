'use client';

import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/app.utils';

import { ButtonProps } from './buttons/Button';
import { useEffect, useState } from 'react';
import IconButton from './buttons/IconButton';
import NextIcon from './NextIcon';

export const alertVariants = cva('rounded-md font-primary px-3 py-3', {
  variants: {
    variant: {
      contained: 'text-white',
      outlined: '',
    },
    color: {
      success: '',
      error: '',
      info: '',
      warning: '',
    },
  },
  compoundVariants:  [
    {
      variant: 'contained',
      color: 'error',
      class: 'bg-error',
    },
    {
      variant: 'contained',
      color: 'success',
      class: 'bg-success',
    },
    {
      variant: 'contained',
      color: 'info',
      class: 'bg-info',
    },
    {
      variant: 'contained',
      color: 'warning',
      class: 'bg-warning',
    },
    // outlined
    {
      variant: 'outlined',
      color: 'error',
      class: 'bg-error-light text-error',
    },
    {
      variant: 'outlined',
      color: 'success',
      class: 'bg-success-light text-success',
    },
    {
      variant: 'outlined',
      color: 'info',
      class: 'bg-info-light text-info',
    },
    {
      variant: 'outlined',
      color: 'warning',
      class: 'bg-warning-light text-warning',
    },
  ],
});

export type AlertProps = {
  message: string;
  className?: string;
  open?: boolean;
  canBeClosed?: boolean;
} & Pick<ButtonProps, 'variant' | 'color'>
  & VariantProps<typeof alertVariants>;

const Alert = ({
  message,
  className,
  variant = 'contained',
  color,
  canBeClosed = true,
  open = true
}: AlertProps) => {
  const [display, setDisplay] = useState<boolean>(true);

  useEffect(() => {
    setDisplay(open);
  }, [open])

  const onClose = () => setDisplay(false);

  return (
    <div
      className={cn(
        alertVariants({ variant, color }),
        display ? 'flex' : 'hidden',
        'flex-row justify-between items-center',
        className,
      )}
    >
      {message}
      {canBeClosed && (
        <IconButton onClick={onClose} noHovered className='p-1'>
          <NextIcon src={variant === 'contained' ? '/icons/x2-white.svg' : '/icons/x2.svg'} width={16} height={16} alt="" />
        </IconButton>
      )}
    </div>
  )
};

export default Alert;
