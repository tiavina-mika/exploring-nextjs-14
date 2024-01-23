'use client';

import { ReactNode } from 'react';

import { createArticle } from '@/server/actions/article.server.actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';

import Form from '@/components/forms/Form';
import { getArticleSchema } from '@/validations/article.validations';

import { IArticle, IArticleInput } from '@/types/article.type';

type Props = {
  children: ReactNode;
};

const ArticleFormProvider = ({ children }: Props) => {
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');

  const form = useForm<IArticleInput>({
    resolver: zodResolver(getArticleSchema(tForm, tArticle)),
  });
  const [state, formAction] = useFormState<IArticle | null, FormData>(
    createArticle,
    null,
  );

  console.log(' ----------- state: ', state);

  return (
    <Form form={form} action={formAction} primaryButtonText={tForm('save')}>
      {children}
    </Form>
  );
};

export default ArticleFormProvider;
