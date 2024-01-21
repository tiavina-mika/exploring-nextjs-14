import { useTranslations } from 'next-intl';

import { ROUTES } from '@/config/routes';

import { IMenu } from '@/types/app.type';

import NavBarItem from './NavBarItem';

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
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Mik.
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            {menus.map((menu: IMenu, index: number) => (
              <NavBarItem
                key={menu.label + index}
                href={menu.value}
                label={menu.label}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;