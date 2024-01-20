export interface ISelectOption<T = string> {
  value: T;
  label: string;
}

export interface IDynamicRouteParams {
  pathname: 'string';
  params: Record<string, string>;
}
