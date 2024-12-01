"use client";

import style from "./page.module.css";
import { useSearchParams } from "next/navigation";
import Review from "@/components/review.detail/review";
import Comment from "@/components/review.detail/comment";
import Input from "@/components/review.detail/input";

export default function Page() {
  const params = useSearchParams();

  const reviewId = params.get("reviewId") as string;
  const name = params.get("nickname") as string;
  const date = params.get("shootDate") as string;
  const content = params.get("content") as string;

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.title}>리뷰 상세보기</p>
        <Review name={name} date={date} content={content} />
        <Comment reviewId={reviewId} />
      </div>
      <Input reviewId={reviewId} />
    </div>
  );
}
