import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { MessageKeys, useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import {
  FieldPath,
  FieldValues,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import { IServerActionResponse } from '@/types/app.type';

type Props<O> = {
  onSubmit: (
    state: IServerActionResponse<O> | null,
    payload: FormData,
  ) => Promise<IServerActionResponse<O> | null>;
  schema: any;
  t: (key: MessageKeys<any, any>) => string;
};

interface ReturnedProps<I extends FieldValues, O> {
  state: IServerActionResponse<O> | null;
  action: any;
  form: UseFormReturn<I>;
}
export const useFormServerAction = <FormInput extends FieldValues, FormOutput>({
  onSubmit,
  schema,
  t,
}: Props<FormOutput>): ReturnedProps<FormInput, FormOutput> => {
  const tForm = useTranslations('Form');

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const {
    setError,
    formState: { errors },
  } = form;
  console.log('errors: ', errors);

  const [state, action] = useFormState<
    IServerActionResponse<FormOutput> | null,
    FormData
  >(onSubmit, null);

  useEffect(() => {
    if (!state) {
      return;
    }

    // In case our form action returns `error` we can now `setError`s
    if (!state.success) {
      state.errors?.forEach((error: any) => {
        setError(error.path as FieldPath<FormInput>, {
          message: tForm(error.message, { field: t(error.path) }),
        });
      });
      return;
    }

    toast.success(t('message.success.added'));
  }, [state, setError, tForm, t]);

  return {
    state,
    action,
    form,
  };
};
