import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

import TextField from '@/components/forms/fields/TextField';
import Form from '@/components/forms/Form';
import { ArticleSchema } from '@/validations/article.validations';

import { ArticleInput } from '@/types/article.type';

type Props = {
  onSubmit: (values: ArticleInput) => void;
};

const ArticleForm = ({ onSubmit }: Props) => {
  const tForm = useTranslations('Form');
  const tArticle = useTranslations('Article');

  const form = useForm<ArticleInput>({
    resolver: zodResolver(ArticleSchema(tForm, tArticle)),
  });

  const { handleSubmit } = form;

  const onSubmitHandler: SubmitHandler<ArticleInput> = async (values) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onSubmit={handleSubmit(onSubmitHandler)}>
      <TextField name="title" label={tArticle('title')} required />
    </Form>
  );
};

export default ArticleForm;
