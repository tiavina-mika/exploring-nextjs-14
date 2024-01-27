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
  successMessage?: string;
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
  successMessage,
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

  /**
   * @description we need useFormState because we need to access to the data returned by the action
   * @param onSubmit the action to be executed
   * @param null the initial state
   */
  const [state, action] = useFormState<
    IServerActionResponse<FormOutput> | null,
    FormData
  >(onSubmit, null);

  useEffect(() => {
    if (!state) {
      return;
    }

    /**
     * In case our form action returns `error` we can now `setError`s
     * and display the error message into the form for each corresponding field
     */
    if (!state.success) {
      state.errors?.forEach((error: any) => {
        setError(error.path as FieldPath<FormInput>, {
          // translate each error message by its key
          // the error message is a translation key, ex: error.required
          message: tForm(error.message, { field: t(error.path) }),
        });
      });
      return;
    }

    if (!successMessage) return;
    // only need toast notification for success
    // the error is displayed into the form (see above)
    toast.success(successMessage);
  }, [state, setError, tForm, t, successMessage]);

  return {
    state,
    action,
    form,
  };
};
