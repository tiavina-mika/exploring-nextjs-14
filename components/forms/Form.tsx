import { FormEvent, ReactNode } from 'react';

import { Form as FormProvider } from '@/components/ui/Form';
import { cn } from '@/utils/app.utils';

import FormSubmitButton from './FormSubmitButton';
import { Schema } from 'zod';

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
  schema?: Schema<any, any>;
  // use form data (from form action) instead of form.getValues()
  useFormData?: boolean;
};

/**
 * use dual onSubmit and action to handle form submission
 * when the form is valid, the action will be called, else the onSubmit will be called
 * validate the form when submitting the form (with form.trigger() or schema.safeParse())
 * @issue: https://github.com/react-hook-form/react-hook-form/issues/10391
 * @param param0
 * @returns
 */
const getOtherProps = ({ form, action, schema, onSubmit, useFormData }: Pick<Props, 'form' | 'action' | 'schema' | 'onSubmit' | 'useFormData'>) => {
  if (useFormData && action) return { action };

  // once the form is valid, return the action (server action)
  if (form.formState.isValid) {
    return {
      // @see: https://github.com/TheEdoRan/next-safe-action/issues/29
      action: () => action(schema?.parse(form.getValues())),
    }
  }

  // client side submit
  return {
    onSubmit: onSubmit || form.handleSubmit(() => {})
  }
}

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
  schema,
  useFormData = true,
  disabled = false,
}: Props) => {
  return (
    <FormProvider {...form}>
      <form
        id={formId}
        className={cn('space-y-6', className)}
        {...getOtherProps({ form, action, schema, onSubmit, useFormData })}
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
