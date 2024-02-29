import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';

import { IMenu } from '@/types/app.type';

import Logo from './Logo';
import NavBarLinks from './NavBarLinks';
import LanguageSwitcher from '../languages/LanguageSwitcher';
import { cn } from '@/utils/app.utils';
import ToggleTheme from '../ToggleTheme';
import AccountMenu from './AccountMenu';

const filterMenus = (menus: IMenu[], pathIds: string[]): IMenu[] => menus.filter((menu: IMenu): boolean => !pathIds.includes(menu.id as string));

type Props = {
  isLoggedIn: boolean;
}

const NavBar = ({ isLoggedIn }: Props) => {
  const t = useTranslations('NavBar');

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
      label: 'Preview Article',
      value: ROUTES.articles.preview('1'),
      id: 'preview-article',
    },
    {
      label: 'Add Article',
      value: ROUTES.articles.add,
      id: 'add-article'
    },
    {
      label: t('signUp'),
      value: ROUTES.signUp,
      id: 'sign-up'
    },
    {
      label: t('login'),
      value: ROUTES.login,
      id: 'login'
    },
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
      value: ROUTES.logout,
      icon: '/icons/power.svg',
      id: 'logout'
    },
  ];

  const loggedInMenus: IMenu[] = filterMenus(menus, ['login', 'sign-up']);

  return (
    <nav className="shadow-grey-200/40 border-gray-200 bg-white shadow-md dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 py-2 md:p-4">
        <Logo />
        <NavBarLinks menus={isLoggedIn ? [...loggedInMenus, ...accountMenus] : menus} />
        {/* responsive */}
        <div className="flex flex-row items-center space-x-4 md:order-3 order-2">
          <LanguageSwitcher
            className="w-[100px]"
            inputClassName="border-gray-200"
          />
          <ToggleTheme />
          <AccountMenu menus={accountMenus} />

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
