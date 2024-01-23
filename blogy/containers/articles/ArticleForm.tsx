import { useTranslations } from 'next-intl';

import TextField from '@/components/forms/fields/TextField';
import TranslationClientProvider from '@/components/TranslationClientProvider';

import ArticleFormProvider from './form/ArticleFormProvider';

const ArticleForm = () => {
  const tArticle = useTranslations('Article');

  return (
    <TranslationClientProvider rootKeys={['Form', 'Article']}>
      <ArticleFormProvider>
        <TextField name="title" label={tArticle('title')} required />
      </ArticleFormProvider>
    </TranslationClientProvider>
  );
};

export default ArticleForm;
