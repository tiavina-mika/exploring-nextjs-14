import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';

import { IMenu } from '@/types/app.type';

import Logo from './Logo';
import NavBarLinks from './NavBarLinks';

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
      label: 'Sign up',
      value: ROUTES.signUp,
      id: 'sign-up'
    },
    {
      label: 'Login',
      value: ROUTES.login,
      id: 'login'
    },
  ];

  const loggedInMenus: IMenu[] = menus.filter((menu: IMenu): boolean => !['login', 'sign-up'].includes(menu.id as string));
  const loggedOutMenus: IMenu[] = menus.filter((menu: IMenu): boolean => !['profile', 'logout'].includes(menu.id as string));

  return (
    <nav className="shadow-grey-200/40 border-gray-200 bg-white shadow-md dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 py-2 md:p-4">
        <Logo />
        <NavBarLinks menus={isLoggedIn ? loggedInMenus : loggedOutMenus} />
      </div>
    </nav>
  );
};

export default NavBar;
