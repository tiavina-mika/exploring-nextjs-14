import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/app.utils';

type Props = {
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, className, ...props }: Props) => (
  <button
    className={cn(
      'rounded-full bg-transparent p-4 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800',
      className,
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
