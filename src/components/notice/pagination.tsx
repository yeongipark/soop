"use client";

import style from "./pagination.module.css";
import { useRecoilState } from "recoil";
import { paginationNumber } from "@/recoil/paginationAtom";

export default function Pagination({ total }: { total: number }) {
  const maxNumber = Math.floor(total / 10);
  const [pageNumber, setPageNumber] = useRecoilState(paginationNumber);

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (maxNumber > pageNumber) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className={style.container}>
      <button className={style.button} onClick={handlePrevious}>
        {"<"}
      </button>
      <span className={style.pageNumber}>{pageNumber}</span>
      <button className={style.button} onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
}
