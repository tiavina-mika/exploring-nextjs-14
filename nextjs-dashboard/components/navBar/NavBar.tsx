import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';

import { IMenu } from '@/types/app.type';

import Logo from './Logo';
import NavBarLinks from './NavBarLinks';

const NavBar = () => {
  const t = useTranslations('NavBar');

  const menus: IMenu[] = [
    {
      label: t('home'),
      value: ROUTES.home,
    },
    {
      label: t('articles'),
      value: (ROUTES.articles as any).root,
    },
    {
      label: t('about'),
      value: ROUTES.about,
    },
    {
      label: 'Preview Article',
      value: ROUTES.articles.preview('1'),
    },
    {
      label: 'Add Article',
      value: ROUTES.articles.add,
    },
  ];

  return (
    <nav className="shadow-grey-200/40 border-gray-200 bg-white shadow-md dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 py-2 md:p-4">
        <Logo />
        <NavBarLinks menus={menus} />
      </div>
    </nav>
  );
};

export default NavBar;
