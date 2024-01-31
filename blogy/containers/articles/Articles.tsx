'use client';

import { getArticles } from '@/server/queries/article.queries';
import { useQuery } from '@tanstack/react-query';

import IconButton from '@/components/buttons/IconButton';
import Card from '@/components/Card';
import NextIcon from '@/components/NextIcon';
import { useRouter } from '@/config/navigation';
import { ROUTES } from '@/config/routes';

import { IArticle } from '@/types/article.type';

const Articles = () => {
  const router = useRouter();
  // this is done because the data is prefetched on the server
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const goToEdition = (id: string) => router.push(ROUTES.articles.edit(id));

  return (
    <div className="flexColumn gap-3">
      {Array.isArray(articles) &&
        articles.map((article: IArticle, index: number) => (
          <Card
            key={article.objectId + index}
            className="flexRow stretchSelf center"
          >
            {article.title}
            <div className="flexRow gap-3">
              <IconButton onClick={() => goToEdition(article.objectId)}>
                <NextIcon src="/icons/edit.svg" width={20} height={20} alt="" />
              </IconButton>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default Articles;
