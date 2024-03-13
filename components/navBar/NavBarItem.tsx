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
} & TextLinkProps;
const NavBarItem = ({ label, href, className, ...linkProps }: Props) => {
  const currentPath = usePathname();

  return (
    <li className="border-b border-gray-100 md:border-b-0">
      <TextLink
        {...linkProps}
        href={href}
        className={cn(
          {
            'text-primary': isLinkActive(currentPath as string, href),
          },
          className,
          'flex flex-row justify-between py-3 md:py-0'
        )}
        underline={false}
      >
        {label}
        <NextIcon
          alt=""
          src="/icons/chevron-right.svg"
          width={18}
          height={18}
          className="opacity-50 inline-block md:hidden"
        />
      </TextLink>
    </li>
  );
};

export default NavBarItem;
