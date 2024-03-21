'use client';

import { useCallback } from 'react';

import { ISelectOption } from '@/types/app.type';

import NextIcon from '@/components/NextIcon';
import IconButton from '@/components/buttons/IconButton';
import Select from '@/components/forms/inputs/Select';
import { createQueryString } from '@/utils/next.utils';
import { usePathname, useRouter } from '@/config/navigation';

type Props = {
  className?: string;
  inputClassName?: string;
  searchParams: Record<string, string>;
  options: ISelectOption<string>[];
};

const SortArticles = ({ className, inputClassName, searchParams, options }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const field = searchParams.field || 'updatedAt';
  const order = searchParams.order || 'asc';

  // create a new query string with the new sort values
  const handleSort = useCallback((values: Record<string, string>) => {
    router.push(
      `${pathname}?${createQueryString(values)}`,
      {
        scroll: false,
      },
    );
  }, [pathname, field, order, router]);

  const handleChange = (value: string) => {
    const state = { ...searchParams, field: value };
    handleSort(state);

  };

  const toggleSort = () => {
    const state = { ...searchParams, order: order === 'asc' ? 'desc' : 'asc' };
    handleSort(state);
  };

  return (
    <div className="flex flex-row items-center">
      <Select
        onChange={handleChange}
        value={options[0].value}
        options={options}
        className={className}
        inputClassName={inputClassName}
      />
      <div>
        <IconButton onClick={toggleSort}>
          <NextIcon src={`/icons/arrow-${order === 'asc' ? 'up' : 'down'}.svg`} size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default SortArticles;
