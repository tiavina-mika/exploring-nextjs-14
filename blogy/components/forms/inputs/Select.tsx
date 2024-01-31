import Text from '@/components/typography/Text';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select as UISelect,
} from '@/components/ui/Select';
import { cn } from '@/utils/app.utils';

import { ISelectOption } from '@/types/app.type';
import { TextSizeType } from '@/types/component.type';

type Props = {
  className?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
  options: ISelectOption[];
  value?: any;
  fullWidth?: boolean;
  labelSize?: TextSizeType;
};

const Select = ({
  label,
  placeholder,
  options,
  className,
  onChange,
  disabled,
  error,
  value,
  labelSize = 'sm',
  fullWidth,
}: Props) => {
  return (
    <div className={cn(fullWidth ? 'w-full' : 'w-[180px]', className)}>
      {label && (
        <Text as="span" size={labelSize}>
          {label}
        </Text>
      )}
      <UISelect
        onValueChange={onChange}
        defaultValue={value}
        disabled={disabled}
      >
        <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </UISelect>
    </div>
  );
};

export default Select;
