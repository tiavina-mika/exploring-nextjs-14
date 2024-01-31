'use client';

import { createArticle } from '@/server/mutations/article.mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { ArticleSchema } from '@/validations/article.validations';
import { setFormError } from '@/utils/utils';

import { IArticleInput } from '@/types/article.type';

const ArticleForm = () => {
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');

  const form = useForm<IArticleInput>({
    resolver: zodResolver(ArticleSchema),
  });

  // server action
  const onSubmit = async (values: FormData) => {
    const result = await createArticle(values);

    setFormError<IArticleInput>(form, result, tForm, tArticle);
  };

  return (
    <Form form={form} action={onSubmit} primaryButtonText={tForm('save')}>
      <TextField name="title" label={tArticle('title')} required />
    </Form>
  );
};

export default ArticleForm;
