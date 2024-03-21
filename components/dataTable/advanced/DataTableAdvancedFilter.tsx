'use client';

import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import Button from '@/components/buttons/Button';
import NextIcon from '@/components/NextIcon';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/Command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

import type { DataTableFilterOption } from '@/types/app.type';

interface DataTableAdvancedFilterProps<TData> {
  options: DataTableFilterOption<TData>[];
  selectedOptions: DataTableFilterOption<TData>[];
  setSelectedOptions: Dispatch<SetStateAction<DataTableFilterOption<TData>[]>>;
  children?: ReactNode;
}

const DataTableAdvancedFilter = <TData,>({
  options,
  selectedOptions,
  setSelectedOptions,
  children,
}: DataTableAdvancedFilterProps<TData>) => {
  const [value, setValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    DataTableFilterOption<TData> | undefined
  >(options[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children ?? (
          <Button variant="outlined" role="combobox" className="capitalize">
            Filter
            <NextIcon
              src="/icons/fa-caret-sort.svg"
              size={6}
              className="ml-2 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Filter by..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={String(option.value)}
                className="capitalize"
                value={String(option.value)}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                  setSelectedOption(option);
                  setSelectedOptions((prev) => {
                    if (currentValue === value) {
                      return prev.filter((item) => item.value !== option.value);
                    }
                    return [...prev, option];
                  });
                }}
              >
                {option.items.length > 0 ? (
                  <NextIcon
                    src="/icons/chevron-down.svg"
                    size={6}
                    className="mr-2"
                    aria-hidden="true"
                  />
                ) : (
                  <NextIcon
                    src="/icons/text.svg"
                    size={6}
                    className="mr-2"
                    aria-hidden="true"
                  />
                )}
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                setSelectedOptions([
                  ...selectedOptions,
                  {
                    id: crypto.randomUUID(),
                    label: String(selectedOption?.label),
                    value: String(selectedOption?.value),
                    items: selectedOption?.items ?? [],
                    isMulti: true,
                  },
                ]);
              }}
            >
              <NextIcon
                src="/icons/plus.svg"
                size={6}
                className="mr-2 opacity-50"
                aria-hidden="true"
              />
              Advanced filter
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DataTableAdvancedFilter;
