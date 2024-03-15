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
import { Checkbox } from '@/components/ui/Checkbox';

type Props = {
  name: string;
  label?: string;
  description?: string;
};

const CheckboxField = ({ name, label, description }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
          <FormControl>
            <Checkbox
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-2 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
            {errors[name] && <FormDescription className="text-error dark:text-error-light">{(errors as any)[name]?.message}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
