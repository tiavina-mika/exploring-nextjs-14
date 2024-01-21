'use client';

import { usePathname } from '@/config/navigation';
import { cn } from '@/utils/utils';

import { IMenu } from '@/types/app.type';

import TextLink from '../typography/TextLink';

const isLinkActive = (currentPath: string, href: IMenu['value']) => {
  if ((href as any).pathname) {
    return currentPath.startsWith((href as any).pathname);
  }

  return href === currentPath;
};

type Props = {
  label: IMenu['label'];
  href: IMenu['value'];
};
const NavBarItem = ({ label, href }: Props) => {
  const currentPath = usePathname();

  return (
    <li>
      <TextLink
        href={href}
        className={cn({
          'text-primary': isLinkActive(currentPath as string, href),
        })}
      >
        {label}
      </TextLink>
    </li>
  );
};

export default NavBarItem;
