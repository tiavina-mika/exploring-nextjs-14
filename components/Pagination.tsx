import { IPagination } from "@/types/app.type";
import TextLink from "./typography/TextLink"
import { PAGINATION } from "@/utils/constants";
import NextIcon from "./NextIcon";
import { ReactNode } from "react";
import { cn } from "@/utils/app.utils";
import { createQueryString } from "@/utils/next.utils";

type Props = {
  total: number;
  className?: string;
  searchParams?: Record<string, string>;
} & IPagination;
const Pagination = ({ page, total, className, searchParams, perPage = PAGINATION.perPage }: Props) => {
  page = !page || page < 1 ? 1 : page;

  const totalPages = Math.ceil(total / perPage);

  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
	// const isPageOutOfRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  /**
   * add other (than page) query string to the url
   * ex: ?field=updatedAt&order=asc&page=2 instead of just ?page=2
   * @param page 
   * @returns 
   */
  const getPaginatedUrl = (page: number): string => {
    if (!searchParams) {
      return `?page=${page.toString()}`
    }

    return `?${createQueryString({ ...searchParams, page })}`;
  }

  const renderArrow = (position: 'left' | 'right'): ReactNode => {
    return (
      <NextIcon
        alt=""
        src={`/icons/chevrons-${position}.svg`}
        width={18}
        height={18}
      />
    )
  }

  return (
    <div className={cn('flex items-center gap-4 rounded-[10px] p-4', className)}>
      {page === 1 ? (
        <div className="opacity-50" aria-disabled="true">
          {renderArrow('left')}
        </div>
      ) : (
        <TextLink href={getPaginatedUrl(prevPage)} aria-label="Previous Page" underline={false} >
          {renderArrow('left')}
        </TextLink>
      )}

      {pageNumbers.map((pageNumber, index) => (
        <TextLink
          key={index}
          className={
            page === pageNumber
              ? "bg-primary fw-bold px-2 rounded-md text-white"
              : "hover:text-primary px-1 rounded-md"
          }
          href={getPaginatedUrl(pageNumber)}
          underline={false}
        >
          {pageNumber}
        </TextLink>
      ))}

      {page === totalPages ? (
        <div className="opacity-50" aria-disabled="true">
          {renderArrow('right')}
        </div>
      ) : (
        <TextLink href={getPaginatedUrl(nextPage)} aria-label="Next Page"  underline={false}>
          {renderArrow('right')}
        </TextLink>
      )}
    </div>
  )
}

export default Pagination