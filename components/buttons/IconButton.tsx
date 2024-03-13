import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/app.utils';

type Props = {
  children: ReactNode;
  className?: string;
  noHovered?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ children, className, noHovered = false, ...props }: Props) => (
  <button
    className={cn(
      'rounded-full bg-transparent p-4 transition-colors duration-200 ease-in-out',
      className,
      !noHovered && 'hover:bg-gray-100 dark:hover:bg-gray-800',
    )}
    type="button"
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
