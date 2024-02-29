'use client';

import { useTransition } from 'react';

import { Locale } from '@/config/i18n';
import { usePathname, useRouter } from '@/config/navigation';
import { cn } from '@/utils/app.utils';

import { ISelectOption } from '@/types/app.type';

import Select from '../forms/inputs/Select';

type Props = {
  defaultValue: Locale;
  options: ISelectOption<Locale>[];
  className?: string;
  inputClassName?: string;
};

const LanguageSwitcherSelect = ({ defaultValue, options, className, inputClassName }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const onSelectChange = (value: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: value });
    });
  };
  return (
    <Select
      onChange={onSelectChange}
      value={defaultValue}
      options={options}
      className={cn({
        'transition-opacity [&:disabled]:opacity-30': isPending,
      }, className)}
      inputClassName={inputClassName}
    />
  );
};

export default LanguageSwitcherSelect;
