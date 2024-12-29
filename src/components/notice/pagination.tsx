"use client";

import style from "./pagination.module.css";

export default function Pagination({
  totalPage,
  page,
  setPage,
}: {
  totalPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (totalPage > page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={style.container}>
      <button
        className={`${style.button} ${page === 1 && style.disabled}`}
        onClick={handlePrevious}
        disabled={page === 1}
      >
        {"<"}
      </button>
      {Array.from({ length: totalPage }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className={`${style.pageButton} ${
              page === pageNumber && style.active
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        className={`${style.button} ${page === totalPage && style.disabled}`}
        onClick={handleNext}
        disabled={page === totalPage}
      >
        {">"}
      </button>
    </div>
  );
}
