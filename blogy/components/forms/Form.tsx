import { FormEvent, ReactNode } from 'react';

import { Form as FormProvider } from '@/components/ui/Form';
import { cn } from '@/utils/app.utils';

import FormSubmitButton from './FormSubmitButton';

type Props = {
  formId?: string;
  onSubmit?: (() => void) | ((event: FormEvent<HTMLFormElement>) => void);
  action?: any;
  form?: any;
  children?: ReactNode;
  primaryButtonText?: string;
  buttonClassName?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Form = ({
  formId,
  onSubmit,
  action,
  form,
  children,
  primaryButtonText,
  className,
  buttonClassName,
  loading,
  disabled = false,
}: Props) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        action={action}
        id={formId}
        className={cn('space-y-6', className)}
      >
        {children}

        <div>
          {!formId && (
            <FormSubmitButton
              className={buttonClassName}
              disabled={disabled}
              loading={loading}
              text={primaryButtonText || 'Save'}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
