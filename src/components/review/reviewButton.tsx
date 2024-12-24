"use client";
import apiClient from "@/util/axios";
import style from "./reviewButton.module.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/util/cookie";
import Alert from "../alert";
import { useRouter } from "next/navigation";

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
  setHelp,
  setIsHelp,
  reviewId,
  helpCnt,
  isHelped,
  productId,
}: {
  setHelp: React.Dispatch<React.SetStateAction<number>>;
  setIsHelp: React.Dispatch<React.SetStateAction<boolean>>;
  reviewId: number;
  helpCnt: number;
  isHelped: boolean;
  productId?: number;
}) {
  // 로그인 안 했을 때 좋아요 버튼 누는 경우우
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  // 좋아요 추가 Mutation
  const postMutation = useMutation({
    mutationFn: () => postReviewLike(reviewId),
    onMutate: () => {
      setHelp((prev) => prev + 1);
      setIsHelp(true);

      // 낙관적 업데이트: 좋아요 취소 상태를 미리 변경
      queryClient.setQueryData(
        ["reviews", String(productId)],
        (oldData: any) => {
          if (!oldData) return;

          const data = {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              reviews: page.reviews.map((review: any) =>
                review.reviewId === reviewId
                  ? { ...review, isHelped: true, helpCnt: review.helpCnt + 1 }
                  : review
              ),
            })),
          };

          return data;
        }
      );
    },
    onSettled: () => {
      queryClient.removeQueries({
        queryKey: ["reviews", productId],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: ["myReviews"],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: ["reviewDetail", reviewId],
        exact: true,
      });
    },
  });

  // 좋아요 취소 Mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteReviewLike(reviewId),
    onMutate: () => {
      setHelp((prev) => prev - 1);
      setIsHelp(false);

      // 낙관적 업데이트: 좋아요 취소 상태를 미리 변경
      queryClient.setQueryData(["reviews", productId], (oldData: any) => {
        if (!oldData) return;

        const data = {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            reviews: page.reviews.map((review: any) =>
              review.reviewId === reviewId
                ? { ...review, isHelped: false, helpCnt: review.helpCnt - 1 }
                : review
            ),
          })),
        };

        return data;
      });
    },
    onSettled: () => {
      queryClient.removeQueries({
        queryKey: ["reviews", productId],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: ["myReviews"],
        exact: true,
      });
      queryClient.removeQueries({
        queryKey: ["reviewDetail", reviewId],
        exact: true,
      });
    },
  });

  const handleLike = () => {
    const cookie = getToken();
    if (!cookie) {
      setShowAlert(true);
      return;
    }

    if (!isHelped) {
      postMutation.mutate(); // 좋아요 추가
    } else {
      deleteMutation.mutate(); // 좋아요 취소
    }
  };

  return (
    <div className={style.container}>
      <span
        className={`${style.likeBtn} ${isHelped ? style.clicked : ""}`}
        onClick={handleLike}
      >
        <span className={`${isHelped ? style.btnAnimation : ""}`}>👍</span>
        도움돼요 <span>{helpCnt}</span>
      </span>
      {showAlert && (
        <Alert
          title="로그인 후 이용해주세요."
          setModalState={() => {
            setShowAlert(false);
            router.push("/login");
          }}
        />
      )}
    </div>
  );
}
