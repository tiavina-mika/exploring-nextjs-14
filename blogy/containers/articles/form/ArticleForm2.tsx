'use client';

import { useEffect } from 'react';

import { createArticle } from '@/server/mutations/article.mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { FieldPath, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { ArticleSchema } from '@/validations/article.validations';

import { IServerActionResponse } from '@/types/app.type';
import { IArticle, IArticleInput } from '@/types/article.type';

const ArticleForm2 = () => {
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');

  const form = useForm<IArticleInput>({
    resolver: zodResolver(ArticleSchema),
  });

  const {
    setError,
    formState: { errors },
  } = form;
  console.log('errors: ', errors);

  const [state, formAction] = useFormState<
    IServerActionResponse<IArticle> | null,
    FormData
  >(createArticle, null);
  console.log('state: ', state);

  useEffect(() => {
    if (!state) {
      return;
    }

    // In case our form action returns `error` we can now `setError`s
    if (!state.success) {
      state.errors?.forEach((error: any) => {
        setError(error.path as FieldPath<IArticleInput>, {
          message: tForm(error.message, { field: tArticle(error.path) }),
        });
      });
      return;
    }

    toast.success(tArticle('message.success.added'));
  }, [state, setError, tForm, tArticle]);

  return (
    <Form form={form} action={formAction} primaryButtonText={tForm('save')}>
      <TextField name="title" label={tArticle('title')} required />
    </Form>
  );
};

export default ArticleForm2;
