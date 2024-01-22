export interface ISelectOption<T = string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
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

export interface DataTableFilterOption<TData> {
  id?: string;
  label: string;
  value: keyof TData | string;
  items: ISelectOption[];
  isMulti?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: ISelectOption[];
}
