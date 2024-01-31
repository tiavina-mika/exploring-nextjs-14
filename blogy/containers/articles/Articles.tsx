import Card from '@/components/Card';

import { IArticle } from '@/types/article.type';

type Props = {
  articles: IArticle[];
};
const Articles = ({ articles = [] }: Props) => {
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
