'use client';

import { HTMLAttributes } from 'react';

import { type Table } from '@tanstack/react-table';

import { cn } from '@/utils/app.utils';

import IconButton from '../buttons/IconButton';
import NextIcon from '../NextIcon';

interface DataTableFloatingBarProps<TData> extends HTMLAttributes<HTMLElement> {
  table: Table<TData>;
}

const DataTableFloatingBar = <TData,>({
  table,
  children,
  className,
  ...props
}: DataTableFloatingBarProps<TData>) => {
  if (table.getFilteredSelectedRowModel().rows.length <= 0) return null;

  return (
    <div
      className={cn(
        'mx-auto flex w-fit items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white',
        className,
      )}
      {...props}
    >
      <IconButton
        aria-label="Clear selection"
        title="Clear"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={() => table.toggleAllRowsSelected(false)}
      >
        <NextIcon
          alt=""
          src="/icons/x2.svg"
          size={6}
          aria-hidden="true"
        />
      </IconButton>
      {table.getFilteredSelectedRowModel().rows.length} row(s) selected
      {children}
    </div>
  );
};

export default DataTableFloatingBar;
