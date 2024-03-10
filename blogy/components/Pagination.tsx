import { IPagination } from "@/types/app.type";
import TextLink from "./typography/TextLink"
import { PAGINATION } from "@/utils/constants";
import NextIcon from "./NextIcon";
import { ReactNode } from "react";
import { cn } from "@/utils/app.utils";

type Props = {
  total: number;
  className?: string;
} & IPagination;
const Pagination = ({ page, total, className, perPage = PAGINATION.perPage }: Props) => {
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
        <TextLink href={`?page=${prevPage}`} aria-label="Previous Page" underline={false} >
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
          href={`?page=${pageNumber}`}
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
        <TextLink href={`?page=${nextPage}`} aria-label="Next Page"  underline={false}>
          {renderArrow('right')}
        </TextLink>
      )}
    </div>
  )
}

export default Pagination