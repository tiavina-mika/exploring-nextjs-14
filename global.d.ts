// Use type safe message keys with `next-intl`
type Messages =
  typeof import('./translations/en/app.json')
  & typeof import('./translations/en/article.json')
  & typeof import('./translations/en/auth.json')
  & typeof import('./translations/en/common.json')
  & typeof import('./translations/en/form.json')
  & typeof import('./translations/en/zod.json');

declare interface IntlMessages extends Messages {}
