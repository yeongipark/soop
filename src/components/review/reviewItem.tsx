"use client";

import style from "./reviewItem.module.css";
import ReviewButton from "./reviewButton";
import Link from "next/link";
import ReviewChatCount from "./reviewChatCount";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { reviewHelpState, reviewIsHelpState } from "@/recoil/reviewFamily";

export default function ReviewItem({
  reviewId,
  nickname,
  content,
  shootDate,
  helpCnt,
  isHelped,
  commentCnt,
  productId,
}: {
  reviewId: number;
  nickname: string;
  content: string;
  shootDate: string;
  helpCnt: number;
  isHelped: boolean;
  commentCnt: number;
  productId: number;
}) {
  // Recoil 상태 관리
  const [help, setHelp] = useRecoilState(reviewHelpState(reviewId));
  const [isHelp, setIsHelp] = useRecoilState(reviewIsHelpState(reviewId));

  // 최초 렌더 시 초기값 설정
  useEffect(() => {
    setHelp(helpCnt);
    setIsHelp(isHelped);
  }, [helpCnt, isHelped, setHelp, setIsHelp]);

  return (
    <div className={style.container}>
      <Link
        href={{ pathname: `/review/detail/${reviewId}`, query: { productId } }}
      >
        <div className={style.title}>
          <p>{nickname}</p>
          <p>{shootDate} 촬영</p>
        </div>
      </Link>

      <div className={style.content}>
        <Link
          href={{
            pathname: `/review/detail/${reviewId}`,
            query: { productId },
          }}
        >
          <p>{content}</p>
        </Link>
      </div>
      <div className={style.recommend}>
        <ReviewButton
          setHelp={setHelp}
          setIsHelp={setIsHelp}
          reviewId={reviewId}
          helpCnt={help}
          isHelped={isHelp}
          productId={productId}
        />
        <Link
          href={{
            pathname: `/review/detail/${reviewId}`,
            query: { productId },
          }}
        >
          <ReviewChatCount commentCnt={commentCnt} />
        </Link>
      </div>
    </div>
  );
}
