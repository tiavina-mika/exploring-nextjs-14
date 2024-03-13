import { type Table } from '@tanstack/react-table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import IconButton from '../buttons/IconButton';
import NextIcon from '../NextIcon';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

const DataTablePagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            aria-label="Go to first page"
            className="size-8 hidden p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <NextIcon
              alt=""
              src="/icons/chevrons-left.svg"
              width={6}
              height={6}
              aria-hidden="true"
            />
          </IconButton>
          <IconButton
            aria-label="Go to previous page"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <NextIcon
              alt=""
              src="/icons/chevron-left.svg"
              width={6}
              height={6}
              aria-hidden="true"
            />
          </IconButton>
          <IconButton
            aria-label="Go to next page"
            className="size-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <NextIcon
              alt=""
              src="/icons/chevron-right.svg"
              width={6}
              height={6}
              aria-hidden="true"
            />
          </IconButton>
          <IconButton
            aria-label="Go to last page"
            className="size-8 hidden p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <NextIcon
              alt=""
              src="/icons/chevrons-right.svg"
              width={6}
              height={6}
              aria-hidden="true"
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination;