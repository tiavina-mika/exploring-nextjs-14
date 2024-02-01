'use client';

import {
  createArticle,
  editArticle,
} from '@/server/mutations/article.mutations';
import { getArticle } from '@/server/queries/article.queries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
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

  // @issue: https://github.com/TheEdoRan/next-safe-action/issues/60
  // this working for creation but not with edition (with .bind(null, id))
  // const { execute: onCreate } = useAction(createArticle, {
  //   onSuccess: (data) => {
  //     router.push(ROUTES.articles.preview((data as any).objectId));
  //   },
  //   onError: (error) => {
  //     setFormError<IArticleInput>(form, error, tForm, tArticle);
  //   },
  // });

  const onSubmit = async (values: FormData) => {
    let data;
    // ------- action process ------- //
    if (id) {
      // add the id to the form data values
      values.append('id', id);
      data = await editArticle(values);
    } else {
      data = await createArticle(values);
    }

    if (!data) return
    // ------- success ------- //
    if (data.data) {
      const article = data.data ;
      // go to preview
      router.push(ROUTES.articles.preview((article as any).objectId));
      return
    }

    // ------- error ------- //
    // display error for each field
    setFormError<IArticleInput>(form, data, tForm, tArticle);
  }

  return (
    <Form
      form={form}
      // @see: https://github.com/TheEdoRan/next-safe-action/issues/29
      action={onSubmit}
      primaryButtonText={tForm('save')}
    >
      <TextField name="title" label={tArticle('title')} required />
    </Form>
  );
};

export default ArticleForm;
