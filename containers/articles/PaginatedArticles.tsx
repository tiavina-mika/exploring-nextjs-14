import { getArticles } from '@/server/queries/article.queries';
import { getTranslations } from 'next-intl/server';

import Text from '@/components/typography/Text';
import Articles from '@/containers/articles/Articles';
import Pagination from '@/components/Pagination';
import { getPaginatedQuery } from '@/utils/app.utils';
import { Breadcrumbs, IBreadCrumbSegment } from '@/components/Breadcrumbs';
import { ROUTES } from '@/config/routes';
import { PAGINATION } from '@/utils/constants';
import { paginationSearchParamsSchema } from '@/validations/app.validations';
import SortArticles from '@/containers/articles/SortArticles';
import { ISearchParams, ISelectOption } from '@/types/app.type';
import TextLink from '@/components/typography/TextLink';
import Button from '@/components/buttons/Button';
import NextIcon from '@/components/NextIcon';
import Container from '@/components/Container';


// ----------------------------- //
// ------------ page ----------- //
// ----------------------------- //
const perPage = PAGINATION.perPage;

type Props = {
  breadcrumbs: IBreadCrumbSegment;
  searchParams : ISearchParams;
  write?: boolean;
};

const PaginatedArticles = async ({ searchParams, breadcrumbs, write }: Props) => {
  const t = await getTranslations('Common');
  const tArticle = await getTranslations('Article');

  const parsedSearchParams = paginationSearchParamsSchema.parse(searchParams);
  const page = parseInt(parsedSearchParams.page, 10) || 1;
  const field = parsedSearchParams.field || 'updatedAt';
  const order = parsedSearchParams.order || 'asc';

  const options: ISelectOption<string>[] = [
    {
      label: t('newest'),
      value: 'updatedAt',
    },
    {
      label: tArticle('title'),
      value: 'title',
    },
  ];

  // preload the data from server
  const data = await getArticles(getPaginatedQuery({
    perPage,
    page,
    field,
    order,
  }));

  return (
    <Container className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <Breadcrumbs
            segments={breadcrumbs}
            isPrivateRoute={write}
          />
          <SortArticles searchParams={parsedSearchParams} options={options} />
        </div>
        {/* creation button */}
        {write && (
          <div>
            <Button>
              <TextLink href={(ROUTES.private.articles as any).add} className="text-weight" underline={false}>
                <NextIcon
                  src="/icons/plus-white.svg"
                  size={18}
                  className="mr-2"
                />
                {tArticle('create')}
              </TextLink>
            </Button>
          </div>
        )}

      </div>
      {(data as any).error ? (
        <Text>{(data as any).error}</Text>
      ) : (
        <>
          <Articles
            tErrorDeletion={tArticle('message.error.deleted')}
            articles={(data as any).articles}
            write={!!write}
          />
          <Pagination
            page={page}
            total={(data as any).count}
            perPage={perPage}
            className="mt-4"
            searchParams={parsedSearchParams}
          />
        </>
      )}
    </Container>
  );
};

export default PaginatedArticles;
