'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import MultiSelect, { IMultiOptionSelect } from '../inputs/MultiSelect';
import Text from '@/components/typography/Text';

type Props = {
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  options: IMultiOptionSelect[];
};

const MultiSelectField = ({ name, label, description, placeholder, required, options }: Props) => {
  const {
    control,
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          {label && <FormLabel>{label} {required && '*'}</FormLabel>}
          <FormControl>
            <MultiSelect
              options={options}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              emptyIndicator={
                <Text className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </Text>
              }
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelectField;
