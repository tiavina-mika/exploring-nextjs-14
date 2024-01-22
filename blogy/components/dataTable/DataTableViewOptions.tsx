'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { type Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';

import Button from '../Button';
import NextIcon from '../NextIcon';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

const DataTableViewOptions = <TData,>({
  table,
}: DataTableViewOptionsProps<TData>) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        aria-label="Toggle columns"
        variant="outlined"
        className="ml-auto hidden h-8 lg:flex"
      >
        <NextIcon
          alt=""
          src="/icons/mixer-hor.svg"
          width={6}
          height={6}
          className="mr-2"
        />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide(),
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DataTableViewOptions;
