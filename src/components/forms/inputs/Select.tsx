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
import NextIcon from '@/components/NextIcon';

type Props = {
  className?: string;
  inputClassName?: string;
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
  inputClassName,
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
        <SelectTrigger className={cn('w-full', error && 'border-red-500', inputClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center">
                {option.icon && <NextIcon alt={option.label} src={option.icon as string} width={12} height={12} className="mr-2" />}
                {option.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </UISelect>
    </div>
  );
};

export default Select;
