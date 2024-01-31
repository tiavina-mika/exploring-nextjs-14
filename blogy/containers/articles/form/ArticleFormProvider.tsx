import TranslationClientProvider from '@/components/TranslationClientProvider';

import ArticleForm from './ArticleForm';

type Props = {
  id?: string;
};
const ArticleFormProvider = ({ id }: Props) => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Article']}>
      <ArticleForm id={id} />
    </TranslationClientProvider>
  );
};

export default ArticleFormProvider;
