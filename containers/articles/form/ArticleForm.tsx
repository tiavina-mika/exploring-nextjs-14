'use client';

import {
  createArticle,
  editArticle,
} from '@/server/mutations/article.mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { useRouter } from '@/config/navigation';
import { ROUTES } from '@/config/routes';
import { ArticleSchema } from '@/validations/article.validations';
import { setFormError } from '@/utils/utils';

import { IArticle, IArticleInput } from '@/types/article.type';
import CheckboxField from '@/components/forms/fields/CheckboxField';
import MultiSelectField from '@/components/forms/fields/MultiSelectField';
import { getArticleCategoriesOptions } from '@/utils/article.utils';
import { useI18nZodErrors } from '@/config/zod/useTranslatedZodError';

// form initial values for creation or edition
const getInitialValues = (article: IArticle | undefined) => {
  // edition
  if (article) {
    return {
      title: article.title,
      active: article.active,
      categories: article.categories || [],
    };
  }

  // creation
  return {
    active: false,
    categories: [],
  }
};

type Props = {
  article?: IArticle;
};
const ArticleForm = ({ article }: Props) => {
  const router = useRouter();
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');
  useI18nZodErrors();

  const form = useForm<IArticleInput>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: getInitialValues(article),
  });

  const categoriesOptions = getArticleCategoriesOptions(tArticle)

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

  const onSubmit = async (values: IArticleInput) => {
    let data;
    // ------- action process ------- //
    if (article) {
      // add the id to the form data values
      data = await editArticle({ ...values, id: article.objectId });
    } else {
      data = await createArticle(values);
    }

    if (!data) return
    // ------- success ------- //
    if (data.data) {
      const article = data.data as any;
      // go to preview
      router.push(ROUTES.articles.preview(article.objectId));
      return
    }

    // ------- error ------- //
    // display error for each field
    setFormError<IArticleInput>(form, data, tForm, tArticle);
  }

  return (
    <Form
      form={form}
      schema={ArticleSchema}
      action={onSubmit}
      primaryButtonText={tForm('save')}
      useFormData={false}
    >
      {/* hide the id input */}
      <TextField name="title" label={tArticle('title')} required />
      <CheckboxField name="active" label={tArticle('publish')} description={tArticle('publishDescription')} />
      <MultiSelectField name="categories" label={tArticle('categories')} options={categoriesOptions} />
    </Form>
  );
};

export default ArticleForm;
