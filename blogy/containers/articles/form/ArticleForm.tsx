'use client';

import {
  createArticle,
  editArticle,
} from '@/server/mutations/article.mutations';
import { getArticle } from '@/server/queries/article.queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { useRouter } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { ArticleSchema } from '@/validations/article.validations';
import { setFormError } from '@/utils/utils';

import { IArticleInput } from '@/types/article.type';

type Props = {
  id?: string;
};
const ArticleForm = ({ id }: Props) => {
  const router = useRouter();
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');

  const { data: article } = useQuery({
    queryKey: ['article', id],
    queryFn: (): any => id && getArticle(id, true),
  });

  const form = useForm<IArticleInput>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: article ? { title: article.title } : {},
  });

  const { execute: onCreate } = useAction(createArticle, {
    onSuccess: (data) => {
      router.push(ROUTES.articles.preview((data as any).objectId));
    },
    onError: (error) => {
      setFormError<IArticleInput>(form, error, tForm, tArticle);
    },
  });

  // for now for edition we only use next default server action
  // @see: https://github.com/TheEdoRan/next-safe-action/issues/29
  const onEdit = editArticle.bind(null, id);

  return (
    <Form
      form={form}
      action={id ? onEdit : onCreate}
      primaryButtonText={tForm('save')}
    >
      <TextField name="title" label={tArticle('title')} required />
    </Form>
  );
};

export default ArticleForm;
