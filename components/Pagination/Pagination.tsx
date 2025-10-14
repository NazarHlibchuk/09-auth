'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  onPageChange: (selected: number) => void;
  totalPages: number;
}

const Pagination = ({ page, onPageChange, totalPages }: PaginationProps) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={totalPages}
      previousLabel="<"
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
};

export default Pagination;
