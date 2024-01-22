export interface ISelectOption<T = string> {
  value: T;
  label: string;
}

export interface IDynamicRouteParams {
  pathname: 'string';
  params: Record<string, string>;
}

export type IMenu = ISelectOption<string | IDynamicRouteParams>;
export interface INavBarSubMenuItem extends IMenu {
  title: string;
}

export interface INavBar {
  title: string;
  items: INavBarSubMenuItem[];
}

export type INavBarMenu = INavBar[] | IMenu[];
