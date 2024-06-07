'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';

import IconButton from './buttons/IconButton';
import NextIcon from './NextIcon';
import { cn } from '@/utils/app.utils';

type Props = {
  className?: string;
};
const ToggleTheme = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn('relative p-2 rounded-md !border-gray-100 dark:!border-gray-500 border', className)}
    >
      <NextIcon
        alt=""
        src="/icons/sun.svg"
        size={19}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <NextIcon
        alt=""
        src="/icons/moon.svg"
        size={24}
        className="absolute top-[5px] left-[5px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />

      <span className="sr-only">Toggle theme</span>
    </IconButton>
  );
};

export default ToggleTheme;
