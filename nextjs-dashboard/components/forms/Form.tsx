import { FormEvent, ReactNode } from 'react';

import { useTranslations } from 'next-intl';

import { Form as FormProvider } from '@/components/ui/Form';
import { cn } from '@/utils/utils';

import Button from '../Button';

type Props = {
  formId?: string;
  onSubmit?: (() => void) | ((event: FormEvent<HTMLFormElement>) => void);
  form?: any;
  children?: ReactNode;
  primaryButtonText?: string;
  buttonClassName?: string;
  className?: string;
  isDisabled?: boolean;
};

const Form = ({
  formId,
  onSubmit,
  form,
  children,
  primaryButtonText,
  className,
  buttonClassName,
  isDisabled = true,
}: Props) => {
  const t = useTranslations('Common');
  const {
    formState: { isDirty, isValid },
    getFieldState,
  } = form;

  const formComponent = (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        id={formId}
        className={cn('space-y-6', className)}
      >
        {children}
        {/* use the local id if no id is defined */}
        <div>
          {!formId && (
            <Button
              className={buttonClassName}
              variant="contained"
              disabled={
                isDisabled && (!isDirty || getFieldState().invalid || !isValid)
              }
              type="submit"
              fullWidth
            >
              {primaryButtonText ?? t('save')}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );

  if (!form) return formComponent;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        id={formId}
        className={cn('space-y-6', className)}
      >
        {formComponent}
      </form>
    </FormProvider>
  );
};

export default Form;
