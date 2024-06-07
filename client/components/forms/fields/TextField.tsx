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
import { Input, InputProps } from '@/components/ui/Input';

type Props = {
  name: string;
  label?: string;
  description?: string;
} & InputProps;

const TextField = ({ name, label, description, ...inputProps }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label} {inputProps.required && '*'}</FormLabel>}
          <FormControl>
            <Input
              {...inputProps}
              {...field}
              error={!!errors[name]?.message}
              placeholder={inputProps.placeholder && inputProps.required ? `${inputProps.placeholder} *` : inputProps.placeholder}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
