"use client";
import apiClient from "@/util/axios";
import style from "./reviewButton.module.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// API 호출 함수
async function postReviewLike(reviewId: number) {
  const res = await apiClient.post(`/api/reviews/${reviewId}/helpful`);
  return res.data;
}

async function deleteReviewLike(reviewId: number) {
  const res = await apiClient.delete(`/api/reviews/${reviewId}/helpful`);
  return res.data;
}

export default function ReviewButton({
  reviewId,
  helpCnt,
  isHelped,
}: {
  reviewId: number;
  helpCnt: number;
  isHelped: boolean;
}) {
  const [liked, setLiked] = useState(isHelped ?? false);
  const [likeCount, setLikeCount] = useState(helpCnt ?? 0);

  // 좋아요 추가 Mutation
  const postMutation = useMutation({
    mutationFn: () => postReviewLike(reviewId),
    onMutate: () => {
      // 낙관적 업데이트: 좋아요 상태를 미리 변경
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    },
    onError: (error) => {
      console.error("Error posting like:", error);
      // 오류 발생 시 상태 롤백
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    },
  });

  // 좋아요 취소 Mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteReviewLike(reviewId),
    onMutate: () => {
      // 낙관적 업데이트: 좋아요 취소 상태를 미리 변경
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    },
    onError: (error) => {
      console.error("Error deleting like:", error);
      // 오류 발생 시 상태 롤백
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    },
  });

  const handleLike = () => {
    if (!liked) {
      postMutation.mutate(); // 좋아요 추가
    } else {
      deleteMutation.mutate(); // 좋아요 취소
    }
  };

  return (
    <div className={style.container}>
      <span
        className={`${style.likeBtn} ${liked ? style.clicked : ""}`}
        onClick={handleLike}
      >
        <span className={`${liked ? style.btnAnimation : ""}`}>👍</span>도움돼요{" "}
        <span>{likeCount}</span>
      </span>
    </div>
  );
}
