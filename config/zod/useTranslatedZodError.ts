import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { makeZodI18nMap } from './zodErrorMap';

export const useI18nZodErrors = () => {
  const t = useTranslations('Zod');
  const tForm = useTranslations('Form');
  z.setErrorMap(makeZodI18nMap({ t, tForm }));
};
