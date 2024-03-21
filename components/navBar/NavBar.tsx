import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';

import { IMenu } from '@/types/app.type';

import Logo from './Logo';
import NavBarLinks from './NavBarLinks';
import ToggleTheme from '../ToggleTheme';
import AccountMenu from './AccountMenu';
import TextLink from '../typography/TextLink';
import { getIsResponsiveScreens } from '@/server/responsive.server';
import { cn } from '@/utils/app.utils';

const filterMenus = (menus: IMenu[], pathIds: string[]): IMenu[] => menus.filter((menu: IMenu): boolean => !pathIds.includes(menu.id as string));

type Props = {
  isLoggedIn: boolean;
  className?: string;
}

const NavBar = ({ isLoggedIn, className }: Props) => {
  const t = useTranslations('NavBar');

  const { isTabletDown } = getIsResponsiveScreens();

  const menus: IMenu[] = [
    {
      label: t('home'),
      value: ROUTES.home,
      id: 'home',
    },
    {
      label: t('articles'),
      value: (ROUTES.articles as any).root,
      id: 'articles',
    },
    {
      label: t('about'),
      value: ROUTES.about,
      id: 'about',
    },
    {
      label: t('contactUs'),
      value: ROUTES.contact,
      id: 'contact',
    },
    // {
    //   label: 'Preview Article',
    //   value: ROUTES.articles.preview('1'),
    //   id: 'preview-article',
    // },
    // {
    //   label: t('signUp'),
    //   value: ROUTES.signUp,
    //   id: 'sign-up'
    // },
    // {
    //   label: t('login'),
    //   value: ROUTES.login,
    //   id: 'login'
    // },
  ];

  const accountMenus: IMenu[] = [
    {
      label: t('profile'),
      value: ROUTES.profile,
      icon: '/icons/user.svg',
      id: 'profile'
    },
    {
      label: t('logout'),
      // the logout url will be added a redirection url search params (see: AccountMenu.tsx)
      value: ROUTES.logout,
      icon: '/icons/power.svg',
      id: 'logout'
    },
  ];


  const rightMenus: IMenu[] = [
    {
      label: t('login'),
      value: ROUTES.login,
      id: 'login'
    },
  ];

  const loggedInMenus: IMenu[] = filterMenus(menus, ['login', 'sign-up']);

  const getMainMenus = () => {
    if (isLoggedIn) {
      return [...loggedInMenus, ...accountMenus];
    }

    // add the right menus to the drawer if the screen is tablet down
    if (isTabletDown) {
      return [...menus, ...rightMenus];
    }

    return menus;
  }

  const getRightMenus = () => {
    if (isLoggedIn) {
      const loggedInMenus: IMenu[] = filterMenus(rightMenus, ['login', 'sign-up']);

      return loggedInMenus;
    }

    return rightMenus;
  }

  return (
    <nav className={cn('shadow-grey-200/40 border-gray-200 bg-white shadow-md dark:bg-gray-900', className)}>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 py-2 md:p-4">
        <div className="flex md:justify-between items-center md:flex-1">
          <Logo />
          <div className="md:flex-1 flex md:justify-center -order-1 md:order-1">
            <NavBarLinks menus={getMainMenus()} />
          </div>
        </div>
        {/* responsive */}
        <div className="flex flex-row items-center justify-end space-x-4 md:order-3 order-2">
          <div className="hidden md:flex flex-row">
            {getRightMenus().map((menu: IMenu, index: number) => (
              <TextLink
                href={menu.value}
                underline={false}
                key={index}
              >
                {menu.label}
              </TextLink>
            ))}
          </div>
          <TextLink href={ROUTES.login} variant="button">
            Login
          </TextLink>
          <ToggleTheme />
          <AccountMenu menus={accountMenus} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
