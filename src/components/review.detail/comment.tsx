"use client";

import apiClient from "@/util/axios";
import style from "./comment.module.css";
import CommentItem from "./commentItem";
import { useQuery } from "@tanstack/react-query";

// CommentResponse 타입 정의
interface CommentResponse {
  id: number;
  writer: string;
  content: string;
  createdAt: string; // ISO 8601 날짜 문자열
}

// ReviewResponse 타입 정의
interface ReviewResponse {
  reviewId: number;
  nickname: string;
  content: string;
  shootDate: string; // ISO 8601 날짜 문자열
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

export default function Comment({ reviewId }: { reviewId: string }) {
  const { data } = useQuery({
    queryKey: ["reviewDetail", reviewId],
    queryFn: () => getReviewDetail(reviewId),
    refetchOnMount: true,
  });

  return (
    <div className={style.container}>
      <p className={style.title}>댓글 ({data?.commentResponses.length})</p>
      {data?.commentResponses.map((comment) => (
        <CommentItem
          key={comment.id}
          name={comment.writer}
          date={comment.createdAt}
          content={comment.content}
        />
      ))}
    </div>
  );
}
