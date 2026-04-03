import ReactPaginate from "react-paginate";

import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: (selected: number) => void;
}

export default function Pagination({
  totalPages,
  page,
  setPage,
}: PaginationProps) {
  return totalPages > 1 ? (
    <div className={css.paginationContainer}>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        nextLabel="→"
        previousLabel="←"
        containerClassName={css.pagination}
        activeClassName={css.active}
      />
    </div>
  ) : null;
}
