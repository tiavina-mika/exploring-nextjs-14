import { IPagination } from "@/types/app.type";
import TextLink from "./typography/TextLink"
import { PAGINATION } from "@/utils/constants";

type Props = {
  total: number;
} & IPagination;
const Pagination = ({ page, total, perPage = PAGINATION.perPage }: Props) => {
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

  return (
    <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
      {page === 1 ? (
        <div className="opacity-60" aria-disabled="true">
          Previous
        </div>
      ) : (
        <TextLink href={`?page=${prevPage}`} aria-label="Previous Page">
          Previous
        </TextLink>
      )}

      {pageNumbers.map((pageNumber, index) => (
        <TextLink
          key={index}
          className={
            page === pageNumber
              ? "bg-green-500 fw-bold px-2 rounded-md text-black"
              : "hover:bg-green-500 px-1 rounded-md"
          }
          href={`?page=${pageNumber}`}
        >
          {pageNumber}
        </TextLink>
      ))}

      {page === totalPages ? (
        <div className="opacity-60" aria-disabled="true">
          Next
        </div>
      ) : (
        <TextLink href={`?page=${nextPage}`} aria-label="Next Page">
          Next
        </TextLink>
      )}
    </div>
  )
}

export default Pagination