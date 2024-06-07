'use client';

import { usePathname } from '@/config/navigation';
import { cn } from '@/utils/app.utils';

import { IMenu } from '@/types/app.type';

import TextLink, { TextLinkProps } from '../typography/TextLink';
import NextIcon from '../NextIcon';

const isLinkActive = (currentPath: string, href: IMenu['value']): boolean => {
  if ((href as any).pathname) {
    return currentPath.startsWith((href as any).pathname);
  }

  return href === currentPath;
};

type Props = {
  label: IMenu['label'];
  href: IMenu['value'];
  className?: string;
  rootClassName?: string;
  withArrow?: boolean;
  onClick?: () => void;
} & TextLinkProps;
const NavBarItem = ({ label, href, className, rootClassName, onClick, withArrow = false, ...linkProps }: Props) => {
  const currentPath = usePathname();

  return (
    <li className={cn('border-b border-gray-100 md:border-b-0', rootClassName)}>
      <TextLink
        {...linkProps}
        href={href}
        className={cn(
          {
            'text-primary dark:!text-primary': isLinkActive(currentPath as string, href),
          },
          className,
          'flex flex-row justify-between py-3 md:py-0'
        )}
        underline={false}
        onClick={onClick}
      >
        {label}
        <NextIcon
          src="/icons/chevron-right.svg"
          size={18}
          className={cn('opacity-50 ', {
            'inline-block md:hidden': !withArrow,
          })}
        />
      </TextLink>
    </li>
  );
};

export default NavBarItem;
