import TranslationClientProvider from '@/components/TranslationClientProvider';

import ArticleForm from './ArticleForm';
import { IArticle } from '@/types/article.type';

type Props = {
  article?: IArticle;
};
const ArticleFormProvider = ({ article }: Props) => {
  return (
    <TranslationClientProvider rootKeys={['Form', 'Article', 'Zod']}>
      <ArticleForm article={article} />
    </TranslationClientProvider>
  );
};

export default ArticleFormProvider;
