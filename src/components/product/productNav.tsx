"use client";
import style from "./productNav.module.css";

// 상품 상세페이지에서 상품 정보, 상품 리뷰 내비게이션 역할
export default function ProductNav({ info }: { info: boolean }) {
  return (
    <div className={style.container}>
      <div className={`${style.button} ${info && style.clicked}`}>INFO</div>
      <div className={`${style.button} ${info || style.clicked}`}>REVIEW</div>
    </div>
  );
}
