import { Dayjs } from 'dayjs';

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

export type DateType = string | number | Date | Dayjs | null | undefined;

// in database, it's a date type, but Parse Server extract the date with this type
export type ParseServerDate = {
  __type: string;
  iso: Date;
};

export type ITranslatedError = {
  path: string;
  message: string;
};

export type IActionError = {
  success: false;
  message?: string;
  errors?: ITranslatedError[]; // list of translation key messages
};

export type IServerActionResponse<T> =
  | {
      success: true;
      data: T;
    }
  | IActionError;
