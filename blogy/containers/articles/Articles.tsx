'use client';

import IconButton from '@/components/buttons/IconButton';
import Card from '@/components/Card';
import NextIcon from '@/components/NextIcon';
import { useRouter } from '@/config/navigation';
import { ROUTES } from '@/config/routes';

import { IArticle } from '@/types/article.type';
import { deleteArticle } from '@/server/mutations/article.mutations';
import { useAction } from 'next-safe-action/hooks';
import { hasServerActionFailed, isServerActionLoading } from '@/utils/utils';
import Alert from '@/components/Alert';
import Title from '@/components/typography/Title';

type Props = {
  tErrorDeletion?: string;
  articles: IArticle[];
};
const Articles = ({ tErrorDeletion, articles }: Props) => {
  const router = useRouter();

  const { execute: handleDelete, status } = useAction(deleteArticle);

  const goToEdition = (id: string) => router.push(ROUTES.articles.edit(id));
  const goToPreview = (id: string) => router.push(ROUTES.articles.preview(id));

  return (
    <div className="flexColumn gap-3">
      {/* {isPending ? <div className="h-8">loading...</div>} */}
      <Alert message={tErrorDeletion || ''} color="error" open={hasServerActionFailed(status)} />
      <div className="flex flex-row gap-3">
        {isServerActionLoading(status) ? <div className="h-8">loading...</div> : Array.isArray(articles) &&
          articles.map((article: IArticle, index: number) => (
            <Card
              key={article.objectId + index}
              contentClassName="flex flex-row justify-between items-center align-stretch self-stretch flex-1"
              className="flex flex-col self-stretch"
            >
              <div className="flex-1 self-stretch flex flex-row items-center">
                <Title level="h5">{article.title}</Title>
              </div>
              <div className="flex flex-row items-center self-stretch">
                <IconButton onClick={() => goToPreview(article.objectId)} className="p-2">
                  <NextIcon src="/icons/eye.svg" width={18} height={18} alt="" />
                </IconButton>
                <IconButton onClick={() => goToEdition(article.objectId)} className="p-2">
                  <NextIcon src="/icons/edit.svg" width={18} height={18} alt="" />
                </IconButton>
                <IconButton onClick={() => handleDelete(article.objectId)} className="p-2">
                  <NextIcon src="/icons/trash.svg" width={18} height={18} alt="" />
                </IconButton>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Articles;
