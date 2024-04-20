'use client'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const buttons = [];
  const maxButtons = 5;

  if (totalPages <= maxButtons) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${i === currentPage ? 'btn-active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
  } else {
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`join-item btn ${1 === currentPage ? 'btn-active' : ''}`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <button key="ellipsis-start" className="join-item btn btn-disabled" disabled>
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${i === currentPage ? 'btn-active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <button key="ellipsis-end" className="join-item btn btn-disabled" disabled>
            ...
          </button>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          className={`join-item btn ${totalPages === currentPage ? 'btn-active' : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
  }
  return (
    <div className="join">
      {buttons.map((button) => button)}
    </div>
  );
};

export default Pagination;
