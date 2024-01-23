'use client';

import { useState } from 'react';

import { cn } from '@/utils/app.utils';

import { IMenu } from '@/types/app.type';

import MobileOpenMenuIcon from './MobileOpenMenuIcon';
import NavBarItem from './NavBarItem';

type Props = {
  menus: IMenu[];
};
const NavBarLinks = ({ menus }: Props) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => setOpenMenu(!openMenu);

  return (
    <>
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
        <ul className="flex flex-col space-y-4 rounded-lg border border-gray-100 p-4  font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:space-y-0 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
          {menus.map((menu: IMenu, index: number) => (
            <NavBarItem
              key={menu.label + index}
              href={menu.value}
              label={menu.label}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBarLinks;
