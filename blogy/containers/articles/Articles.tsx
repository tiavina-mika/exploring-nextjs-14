'use client';

import { getArticles } from '@/server/queries/article.queries';
import { useQuery } from '@tanstack/react-query';

import Card from '@/components/Card';

import { IArticle } from '@/types/article.type';

const Articles = () => {
  // this is done because the data is prefetched on the server
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
    select: (data) => (data as any).data,
  });

  return (
    <div className="flexColumn gap-3">
      {Array.isArray(articles) &&
        articles.map((article: IArticle, index: number) => (
          <Card
            key={article.objectId + index}
            className="flexRow stretchSelf center"
          >
            {article.title}
          </Card>
        ))}
    </div>
  );
};

export default Articles;
