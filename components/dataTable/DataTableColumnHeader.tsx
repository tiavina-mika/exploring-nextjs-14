import { HTMLAttributes } from 'react';

import { type Column } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { cn } from '@/utils/app.utils';

import Button from '../buttons/Button';
import NextIcon from '../NextIcon';

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label={
              // eslint-disable-next-line no-nested-ternary
              column.getIsSorted() === 'desc'
                ? `Sorted descending. Click to sort ascending.`
                : column.getIsSorted() === 'asc'
                  ? `Sorted ascending. Click to sort descending.`
                  : `Not sorted. Click to sort ascending.`
            }
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {/* eslint-disable-next-line no-nested-ternary */}
            {column.getIsSorted() === 'desc' ? (
              <NextIcon
                alt=""
                src="/icons/arrow-down.svg"
                width={6}
                height={6}
                aria-hidden="true"
                className="ml-2"
              />
            ) : column.getIsSorted() === 'asc' ? (
              <NextIcon
                alt=""
                src="/icons/arrow-up.svg"
                width={6}
                height={6}
                aria-hidden="true"
                className="ml-2"
              />
            ) : (
              <NextIcon
                alt=""
                src="/icons/fa-caret-sort.svg"
                width={6}
                height={6}
                aria-hidden="true"
                className="ml-2"
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => column.toggleSorting(false)}
          >
            <NextIcon
              alt=""
              src="/icons/arrow-up.svg"
              width={3.5}
              height={3.5}
              aria-hidden="true"
              className="mr-2 text-muted-foreground/70"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort descending"
            onClick={() => column.toggleSorting(true)}
          >
            <NextIcon
              alt=""
              src="/icons/arrow-down.svg"
              width={3.5}
              height={3.5}
              aria-hidden="true"
              className="mr-2 text-muted-foreground/70"
            />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            aria-label="Hide column"
            onClick={() => column.toggleVisibility(false)}
          >
            <NextIcon
              alt=""
              src="/icons/eye-off.svg"
              width={3.5}
              height={3.5}
              aria-hidden="true"
              className="mr-2 text-muted-foreground/70"
            />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
