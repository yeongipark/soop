"use client";
import style from "./productNav.module.css";
import useProductNav from "@/hooks/useProductNav";

// 상품 상세페이지에서 상품 정보, 상품 리뷰 내비게이션 역할
export default function ProductNav({ info }: { info: boolean }) {
  const { divRef, handleInfoClick, handleReviewClick } = useProductNav();

  return (
    <div className={style.container} ref={divRef}>
      <div
        className={`${style.button} ${info && style.clicked}`}
        onClick={handleInfoClick}
      >
        INFO
      </div>
      <div
        className={`${style.button} ${info || style.clicked}`}
        onClick={handleReviewClick}
      >
        REVIEW
      </div>
    </div>
  );
}
