'use client';

import { createArticle } from '@/server/actions/article.server.actions';
import { useTranslations } from 'next-intl';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { useFormServerAction } from '@/hooks/useFormServerAction';
import { ArticleSchema } from '@/validations/article.validations';

import { IArticle, IArticleInput } from '@/types/article.type';

const ArticleForm = () => {
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');

  const { action, form } = useFormServerAction<IArticleInput, IArticle>({
    onSubmit: createArticle,
    schema: ArticleSchema,
    t: tArticle,
  });

  return (
    <Form form={form} action={action} primaryButtonText={tForm('save')}>
      <TextField name="title" label={tArticle('title')} required />
    </Form>
  );
};

export default ArticleForm;
