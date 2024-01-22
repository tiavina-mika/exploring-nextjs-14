'use client';

import * as React from 'react';

import type { Table } from '@tanstack/react-table';

import Button from '@/components/buttons/Button';
import NextIcon from '@/components/NextIcon';
import { Input } from '@/components/ui/Input';

import type {
  DataTableFilterableColumn,
  DataTableFilterOption,
  DataTableSearchableColumn,
} from '@/types/app.type';

import DataTableViewOptions from '../DataTableViewOptions';
import DataTableAdvancedFilter from './DataTableAdvancedFilter';
import DataTableAdvancedFilterItem from './DataTableAdvancedFilterItem';
import { DataTableMultiFilter } from './DataTableMultiFilter';

interface DataTableAdvancedToolbarProps<TData> {
  dataTable: Table<TData>;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  filterableColumns?: DataTableFilterableColumn<TData>[];
}

export const DataTableAdvancedToolbar = <TData,>({
  dataTable,
  filterableColumns = [],
  searchableColumns = [],
}: DataTableAdvancedToolbarProps<TData>) => {
  const [selectedOptions, setSelectedOptions] = React.useState<
    DataTableFilterOption<TData>[]
  >([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (selectedOptions.length > 0) {
      setOpen(true);
    }
  }, [selectedOptions]);

  const options: DataTableFilterOption<TData>[] = React.useMemo(() => {
    const searchableOptions = searchableColumns.map((column) => ({
      id: crypto.randomUUID(),
      label: String(column.id),
      value: column.id,
      items: [],
    }));
    const filterableOptions = filterableColumns.map((column) => ({
      id: crypto.randomUUID(),
      label: column.title,
      value: column.id,
      items: column.options,
    }));

    return [...searchableOptions, ...filterableOptions];
  }, [filterableColumns, searchableColumns]);

  return (
    <div className="w-full space-y-2.5 overflow-auto p-1">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumns.length > 0 &&
            searchableColumns.map(
              (column) =>
                dataTable.getColumn(column.id ? String(column.id) : '') && (
                  <Input
                    key={String(column.id)}
                    placeholder={`Filter ${column.title}...`}
                    value={
                      (dataTable
                        .getColumn(String(column.id))
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      dataTable
                        .getColumn(String(column.id))
                        ?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                ),
            )}
        </div>
        <div className="flex items-center space-x-2">
          {selectedOptions.length > 0 ? (
            <Button
              variant="outlined"
              // size="sm"
              onClick={() => setOpen((prev) => !prev)}
            >
              Filter
              <NextIcon
                alt=""
                src="/icons/check.svg"
                width={6}
                height={6}
                className=" ml-2 opacity-50"
                aria-hidden="true"
              />
            </Button>
          ) : (
            <DataTableAdvancedFilter
              options={options.filter(
                (option) =>
                  !selectedOptions.some(
                    (selectedOption) => selectedOption.value === option.value,
                  ),
              )}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )}
          <DataTableViewOptions table={dataTable} />
        </div>
      </div>
      {open ? (
        <div className="flex items-center space-x-2">
          {selectedOptions.some((option) => option.isMulti) ? (
            <DataTableMultiFilter
              table={dataTable}
              allOptions={options}
              options={selectedOptions.filter((option) => option.isMulti)}
              setSelectedOptions={setSelectedOptions}
            />
          ) : null}
          {selectedOptions
            .filter((option) => !option.isMulti)
            .map((selectedOption) => (
              <DataTableAdvancedFilterItem
                key={String(selectedOption.value)}
                table={dataTable}
                selectedOption={selectedOption}
                setSelectedOptions={setSelectedOptions}
              />
            ))}
          <DataTableAdvancedFilter
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          >
            <Button
              variant="outlined"
              // size="sm"
              role="combobox"
              className="rounded-full"
            >
              <NextIcon
                alt=""
                src="/icons/plus.svg"
                width={6}
                height={6}
                className="mr-2 opacity-50"
                aria-hidden="true"
              />
              Add filter
            </Button>
          </DataTableAdvancedFilter>
        </div>
      ) : null}
    </div>
  );
};
