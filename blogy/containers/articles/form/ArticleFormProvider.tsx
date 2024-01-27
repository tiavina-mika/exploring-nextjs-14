import TranslationClientProvider from '@/components/TranslationClientProvider';

import ArticleForm from './ArticleForm';

const ArticleFormProvider = () => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Article']}>
      <ArticleForm />
    </TranslationClientProvider>
  );
};

export default ArticleFormProvider;
