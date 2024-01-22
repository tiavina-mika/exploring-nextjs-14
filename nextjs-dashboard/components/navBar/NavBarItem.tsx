'use client';

import { usePathname } from '@/config/navigation';
import { cn } from '@/utils/utils';

import { IMenu } from '@/types/app.type';

import TextLink, { TextLinkProps } from '../typography/TextLink';

const isLinkActive = (currentPath: string, href: IMenu['value']) => {
  if ((href as any).pathname) {
    return currentPath.startsWith((href as any).pathname);
  }

  return href === currentPath;
};

type Props = {
  label: IMenu['label'];
  href: IMenu['value'];
  className?: string;
} & TextLinkProps;
const NavBarItem = ({ label, href, className, ...linkProps }: Props) => {
  const currentPath = usePathname();

  return (
    <li>
      <TextLink
        {...linkProps}
        href={href}
        className={cn(
          {
            'text-primary': isLinkActive(currentPath as string, href),
          },
          className,
        )}
      >
        {label}
      </TextLink>
    </li>
  );
};

export default NavBarItem;
