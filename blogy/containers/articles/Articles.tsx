'use client';

import { getArticles } from '@/server/queries/article.queries';
import { useQuery } from '@tanstack/react-query';

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
}
const Articles = ({ tErrorDeletion }: Props) => {
  const router = useRouter();
  // this is done because the data is prefetched on the server
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const { execute: handleDelete, status } = useAction(deleteArticle);

  const goToEdition = (id: string) => router.push(ROUTES.articles.edit(id));

  return (
    <div className="flexColumn gap-3">
      {/* {isPending ? <div className="h-8">loading...</div>} */}
      <Alert message={tErrorDeletion || ''} color="error" open={!!hasServerActionFailed(status)} />
      {isServerActionLoading(status) ? <div className="h-8">loading...</div> : Array.isArray(articles) &&
        articles.map((article: IArticle, index: number) => (
          <Card
            key={article.objectId + index}
            contentClassName="flex flex-row justify-between items-center align-stretch"
          >
            <Title level="h5">{article.title}</Title>
            <div className="flexRow space-x-2">
              <IconButton onClick={() => goToEdition(article.objectId)}>
                <NextIcon src="/icons/edit.svg" width={20} height={20} alt="" />
              </IconButton>
              <IconButton onClick={() => handleDelete(article.objectId)}>
                <NextIcon src="/icons/trash.svg" width={20} height={20} alt="" />
              </IconButton>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Articles;
