'use client';

import { useState } from 'react';

import { cn } from '@/utils/app.utils';

import { IMenu } from '@/types/app.type';

import MobileOpenMenuIcon from './MobileOpenMenuIcon';
import NavBarItem from './NavBarItem';
import ToggleTheme from '../ToggleTheme';
import Text from '../typography/Text';

type Props = {
  menus: IMenu[];
  className?: string;
  tChangeTheme: string;
};
const NavBarLinks = ({ menus, className, tChangeTheme }: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <div className={className}>
      <MobileOpenMenuIcon onClick={toggleMenu} />
      <div
        className={cn(
          'z-50 w-full bg-white md:block md:w-auto',
          openMenu
            ? `absolute bottom-0 left-0 right-0 top-[56px] md:relative md:mt-0 md:block`
            : 'hidden',
        )}
        id="navbar-default"
      >
        <ul className="md:relative absolute top-0 left-0 right-0 bottom-0 flex flex-col border border-gray-100 p-4  font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
          {menus.map((menu: IMenu, index: number) => (
            <NavBarItem
              key={menu.label + index}
              href={menu.value}
              label={menu.label}
              // hide profile and logout on desktop since it is already in the dropdown
              className={cn({
                'md:hidden': ['profile', 'logout', 'dashboard'].includes(menu.id as string),
                'md:hidden block': menu.display === 'mobile'
              })}
            />
          ))}
          <li key="toggle-theme" className="flex items-center gap-2 absolute bottom-4 md:hidden">
            <ToggleTheme />
            <Text>
              {tChangeTheme}
            </Text>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBarLinks;
