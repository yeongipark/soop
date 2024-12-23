"use client";

import style from "./page.module.css";
import Review from "@/components/review.detail/review";
import Comment from "@/components/review.detail/comment";
import Input from "@/components/review.detail/input";
import apiClient from "@/util/axios";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert";
import { useEffect, useState } from "react";

// CommentResponse 타입 정의
interface CommentResponse {
  id: number;
  writer: string;
  content: string;
  createdAt: string;
}

// ReviewResponse 타입 정의
interface ReviewResponse {
  reviewId: number;
  nickname: string;
  content: string;
  shootDate: string;
  helpCnt: number;
  isHelped: boolean;
  commentCnt: number;
}

// 전체 응답 타입 정의
export interface ReviewData {
  reviewResponse: ReviewResponse;
  commentResponses: CommentResponse[];
}

async function getReviewDetail(reviewId: string): Promise<ReviewData> {
  const res = await apiClient.get(`/api/reviews/${reviewId}/detail`);
  return res.data;
}

export default function Page({ params }: { params: { id: number } }) {
  const router = useRouter();
  const reviewId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReviewData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const fetched = await getReviewDetail(String(reviewId));
        setData(fetched);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [reviewId]);

  if (isLoading) return <div>로딩중...</div>;

  if (!data) {
    return (
      <Alert
        title="잘못된 접근입니다. 다시 시도해주세요."
        setModalState={() => router.replace("/product")}
      />
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p className={style.title}>리뷰 상세보기</p>
        <Review
          name={data.reviewResponse.nickname}
          date={data.reviewResponse.shootDate}
          content={data.reviewResponse.content}
          helpCnt={data.reviewResponse.helpCnt}
          isHelped={data.reviewResponse.isHelped}
          reviewId={data.reviewResponse.reviewId}
        />
        <Comment contents={data.commentResponses} />
      </div>
      <Input reviewId={String(reviewId)} />
    </div>
  );
}
