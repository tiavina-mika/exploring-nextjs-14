import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Table } from '@tanstack/react-table';

import Button from '@/components/buttons/Button';
import NextIcon from '@/components/NextIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Input } from '@/components/ui/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import { useDebounce } from '@/hooks/useDebounce';

import { DataTableFilterOption } from '@/types/app.type';

import DataTableFacetedFilter from '../DataTableFacetedFilter';

const operators = [
  {
    label: 'And',
    value: 'and',
  },
  {
    label: 'Or',
    value: 'or',
  },
];

interface MultiFilterRowProps<TData> extends DataTableMultiFilterProps<TData> {
  i: number;
  option: DataTableFilterOption<TData>;
  operator?: (typeof operators)[number];
  setOperator: Dispatch<SetStateAction<(typeof operators)[number] | undefined>>;
}

export const MultiFilterRow = <TData,>({
  i,
  table,
  option,
  allOptions,
  options,
  setSelectedOptions,
  operator,
  setOperator,
}: MultiFilterRowProps<TData>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const debounceValue = useDebounce(value, 500);

  const [selectedOption, setSelectedOption] = useState<
    DataTableFilterOption<TData> | undefined
  >(options[0]);

  const filterVarieties = selectedOption?.items.length
    ? ['is', 'is not']
    : ['contains', 'does not contain', 'is', 'is not'];

  const [filterVariety, setFilterVariety] = useState(filterVarieties[0]);

  // Update filter variety
  useEffect(() => {
    if (selectedOption?.items.length) {
      setFilterVariety('is');
    }
  }, [selectedOption?.items.length]);

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Update query string
  useEffect(() => {
    if (debounceValue.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOption?.value ?? '']: `${debounceValue}${
            debounceValue.length > 0 ? `.${filterVariety}` : ''
          }`,
        })}`,
        {
          scroll: false,
        },
      );
    }

    if (debounceValue.length === 0) {
      router.push(
        `${pathname}?${createQueryString({
          [selectedOption?.value ?? '']: null,
        })}`,
        {
          scroll: false,
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, filterVariety, selectedOption?.value]);

  // Update operator query string
  useEffect(() => {
    if (operator?.value) {
      router.push(
        `${pathname}?${createQueryString({
          operator: operator.value,
        })}`,
        {
          scroll: false,
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operator?.value]);

  return (
    <div className="flex items-center space-x-2">
      {/* eslint-disable-next-line no-nested-ternary */}
      {i === 0 ? (
        <div>Where</div>
      ) : i === 1 ? (
        <Select
          value={operator?.value}
          onValueChange={(value) =>
            setOperator(operators.find((o) => o.value === value))
          }
        >
          <SelectTrigger className="h-8 w-fit text-xs">
            <SelectValue placeholder={operator?.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {operators.map((operator) => (
                <SelectItem
                  key={operator.value}
                  value={operator.value}
                  className="text-xs"
                >
                  {operator.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <div key={operator?.value}>{operator?.label}</div>
      )}
      <Select
        value={String(selectedOption?.value)}
        onValueChange={(value) => {
          setSelectedOption(
            allOptions.find((option) => option.value === value),
          );
          setSelectedOptions((prev) =>
            prev.map((item) => {
              if (item.id === option.id) {
                return {
                  ...item,
                  value,
                };
              }
              return item;
            }),
          );
        }}
      >
        <SelectTrigger className="h-8 w-full text-xs capitalize">
          <SelectValue placeholder={selectedOption?.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {allOptions.map((option) => (
              <SelectItem
                key={String(option.value)}
                value={String(option.value)}
                className="text-xs capitalize"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={filterVariety}
        onValueChange={(value) => setFilterVariety(value)}
      >
        <SelectTrigger className="h-8 w-full truncate px-2 py-0.5 hover:bg-muted/50">
          <SelectValue placeholder={filterVarieties[0]} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filterVarieties.map((variety) => (
              <SelectItem key={variety} value={variety}>
                {variety}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedOption?.items.length ? (
        table.getColumn(selectedOption.value ? String(option.value) : '') && (
          <DataTableFacetedFilter
            key={selectedOption.id}
            column={table.getColumn(
              selectedOption.value ? String(selectedOption.value) : '',
            )}
            title={selectedOption.label}
            options={selectedOption.items}
          />
        )
      ) : (
        <Input
          placeholder="Type here..."
          className="h-8"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoFocus
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            // variant="ghost" size="icon"
            className="size-8 shrink-0"
          >
            <NextIcon
              alt=""
              src="/icons/more-horizontal.svg"
              width={6}
              height={6}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setSelectedOptions((prev) =>
                prev.filter((item) => item.id !== option.id),
              );
            }}
          >
            <NextIcon
              alt=""
              src="/icons/trash.svg"
              width={6}
              height={6}
              className="mr-2"
              aria-hidden="true"
            />
            Remove
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setSelectedOptions((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  label: String(selectedOption?.label),
                  value: String(selectedOption?.value),
                  isMulti: true,
                  items: selectedOption?.items ?? [],
                },
              ]);
            }}
          >
            <NextIcon
              alt=""
              src="/icons/copy.svg"
              width={6}
              height={6}
              className="mr-2"
              aria-hidden="true"
            />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface DataTableMultiFilterProps<TData> {
  table: Table<TData>;
  allOptions: DataTableFilterOption<TData>[];
  options: DataTableFilterOption<TData>[];
  setSelectedOptions: Dispatch<SetStateAction<DataTableFilterOption<TData>[]>>;
}

export const DataTableMultiFilter = <TData,>({
  table,
  allOptions,
  options,
  setSelectedOptions,
}: DataTableMultiFilterProps<TData>) => {
  const [open, setOpen] = useState(true);
  const [operator, setOperator] = useState(operators[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outlined" className="h-7 truncate rounded-full">
          <NextIcon
            alt=""
            src="/icons/align-center.svg"
            width={5}
            height={5}
            className="mr-2"
            aria-hidden="true"
          />
          {options.length} rule
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 text-xs" align="start">
        <div className="space-y-2 p-4">
          {options.map((option, i) => (
            <MultiFilterRow
              key={option.id ?? i}
              i={i}
              option={option}
              table={table}
              allOptions={allOptions}
              options={options}
              setSelectedOptions={setSelectedOptions}
              operator={operator}
              setOperator={setOperator as any}
            />
          ))}
        </div>
        <Separator />
        <div className="p-1">
          <Button
            aria-label="Delete filter"
            // variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setSelectedOptions((prev) =>
                prev.filter((item) => !item.isMulti),
              );
            }}
          >
            Delete filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
