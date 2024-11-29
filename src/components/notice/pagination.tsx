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
      <button className={style.button} onClick={handlePrevious}>
        {"<"}
      </button>
      <span className={style.pageNumber}>{page}</span>
      <button className={style.button} onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
}
