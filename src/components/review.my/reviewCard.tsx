"use client";

import { useRecoilState } from "recoil";
import ReviewButton from "../review/reviewButton";
import ReviewChatCount from "../review/reviewChatCount";
import style from "./reviewCard.module.css";
import Link from "next/link";
import { reviewHelpState, reviewIsHelpState } from "@/recoil/reviewFamily";
import { useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function ReviewCard({
  productId,
  reviewId,
  nickname,
  content,
  shootDate,
  helpCnt,
  isHelped,
  commentCnt,
  productName,
  onClick,
}: {
  productId: number;
  reviewId: number;
  nickname: string;
  content: string;
  shootDate: string;
  helpCnt: number;
  isHelped: boolean;
  commentCnt: number;
  productName: string;
  onClick: () => void;
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
      <div className={style.title}>
        <div style={{ display: "flex" }}>
          <p>
            <Link
              href={{
                pathname: `/review/detail/${reviewId}`,
                query: { productId },
              }}
            >
              {nickname}
            </Link>
          </p>
          <p>{shootDate} 촬영</p>
        </div>
        <HiOutlineDotsHorizontal className={style.icon} onClick={onClick} />
      </div>
      <Link
        href={{
          pathname: `/review/detail/${reviewId}`,
          query: { productId },
        }}
      >
        <p className={style.productName}>{productName}</p>
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
