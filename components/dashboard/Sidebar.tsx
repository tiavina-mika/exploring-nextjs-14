import { IMenu } from "@/types/app.type";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/config/routes";
import NavBarItem from "../navBar/NavBarItem";
import { Fragment } from "react";
import { cn } from "@/utils/app.utils";

type Props = {
  className?: string;
}

const Sidebar = ({ className }: Props) => {
  const t = useTranslations('NavBar');
  const menus: IMenu[] = [
    {
      label: t('dashboard'),
      value: ROUTES.dashboard,
      id: 'dashboard',
    },
    {
      label: t('myArticles'),
      value: ROUTES.private.articles.root,
      id: 'articles',
    },
  ];

  return (
    <aside
      id="default-sidebar"
      className={cn("md:min-h-[800px] self-stretch z-40 w-64 transition-transform -translate-x-full sm:translate-x-0", className)}
      aria-label="Sidebar"
    >
      <div className="h-full bg-gray-50 dark:bg-gray-800 py-4 overflow-y-auto rounded-sm">
        <ul className="space-y-4 font-medium">
          {menus.map((menu: IMenu, index: number) => (
            <NavBarItem
              key={menu.label + index}
              href={menu.value}
              label={menu.label}
              withArrow
              rootClassName="md:border-b-1 md:border-b md:border-gray-300 px-3 pb-4"
            />
          ))}
          {/* // <li>
          //   <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          //     <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
          //         <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
          //         <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
          //     </svg>
          //     <span className="ms-3">Dashboard</span>
          //   </a>
          // </li> */}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
