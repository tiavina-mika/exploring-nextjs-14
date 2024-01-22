'use client';

import { MouseEventHandler, useTransition } from 'react';

import type { Table } from '@tanstack/react-table';

import Button, { buttonVariants } from '@/components/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/utils';

import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/types/app.type';

import NextIcon from '../NextIcon';
import TextLink from '../typography/TextLink';
import DataTableFacetedFilter from './DataTableFacetedFilter';
import DataTableViewOptions from './dataTableViewOptions';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  newRowLink?: string;
  deleteRowsAction?: MouseEventHandler<HTMLButtonElement>;
}

const DataTableToolbar = <TData,>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  newRowLink,
  deleteRowsAction,
}: DataTableToolbarProps<TData>) => {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <Input
                  key={String(column.id)}
                  placeholder={`Filter ${column.title}...`}
                  value={
                    (table
                      .getColumn(String(column.id))
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.id))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-[150px] lg:w-[250px]"
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : '')}
                  title={column.title}
                  options={column.options}
                />
              ),
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <NextIcon
              alt=""
              src="/icons/check.svg"
              width={6}
              height={6}
              className="ml-2"
              aria-hidden="true"
            />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {/* eslint-disable-next-line no-nested-ternary */}
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Delete selected rows"
            variant="outlined"
            className="h-8"
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false);
                deleteRowsAction(event);
              });
            }}
            disabled={isPending}
          >
            <NextIcon
              alt=""
              src="/icons/plus-circle.svg"
              width={6}
              height={6}
              className="mr-2"
              aria-hidden="true"
            />
            Delete
          </Button>
        ) : newRowLink ? (
          <TextLink aria-label="Create new row" href={newRowLink}>
            <div
              className={cn(
                buttonVariants({
                  variant: 'outlined',
                  className: 'h-8',
                }),
              )}
            >
              <NextIcon
                alt=""
                src="/icons/plus-circle.svg"
                width={6}
                height={6}
                className="mr-2"
                aria-hidden="true"
              />
              New
            </div>
          </TextLink>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};

export default DataTableToolbar;
