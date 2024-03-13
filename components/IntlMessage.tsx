import { useTranslations } from 'next-intl';

interface Props {
  /** Message key */
  path: Paths<IntlMessages>;
}

export const IntlMessage = ({ path: key }: Props) => {
  const translate = useTranslations();

  return translate(key);
};

type Paths<Schema, Path extends string = ''> = Schema extends string
  ? Path
  : Schema extends object
    ? {
        [K in keyof Schema & string]: Paths<
          Schema[K],
          `${Path}${Path extends '' ? '' : '.'}${K}`
        >;
      }[keyof Schema & string]
    : never;
