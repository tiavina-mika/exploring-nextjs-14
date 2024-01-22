'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';

import Button from '@/components/buttons/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import NextIcon from './NextIcon';

const ToggleTheme = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outlined" className="relative">
          <NextIcon
            alt=""
            src="/icons/sun.svg"
            width={24}
            height={24}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <NextIcon
            alt=""
            src="/icons/moon.svg"
            width={24}
            height={24}
            className="absolute top-[5px] translate-y-1/4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ToggleTheme;
