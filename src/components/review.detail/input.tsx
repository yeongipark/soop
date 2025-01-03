"use client";

import style from "./input.module.css";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/util/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getToken } from "@/util/cookie";
import Alert from "../alert";

// 댓글을 서버에 전송하는 함수
async function postComment(reviewId: string, content: string) {
  const res = await apiClient.post(`/api/comments/reviews/${reviewId}`, {
    content,
  });
  return res.data; // 성공적으로 등록된 댓글 데이터 반환
}

export default function Input({ reviewId }: { reviewId: string }) {
  // 로그인 안 했을 때 댓글 작성하는 경우
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = String(searchParams.get("productId"));

  const [input, setInput] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (content: string) => postComment(reviewId, content),
    onMutate: async (newContent) => {
      const previousComments = queryClient.getQueryData([
        "reviewDetail",
        reviewId,
      ]);

      // 새 댓글을 추가한 상태로 업데이트
      queryClient.setQueryData(
        ["reviewDetail", reviewId],
        (oldData: ReviewData) => {
          return {
            ...oldData,
            commentResponses: [
              ...oldData.commentResponses,
              {
                id: Date.now(), // 임시 ID
                writer: "re-bin",
                content: newContent,
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }
      );

      return { previousComments };
    },
    onError: (context: any) => {
      console.log("에러 발생");
      // 오류 발생 시, 이전 상태로 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["reviewDetail", reviewId],
          context.previousComments
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", productId],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["reviewDetail", reviewId],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["myReviews"],
        refetchType: "all",
      });
    },
  });

  const handleSubmit = () => {
    const cookie = getToken();
    if (!cookie) {
      setShowAlert(true);
      return;
    }

    if (input.trim().length >= 2) {
      mutate(input); // 댓글 등록
      setInput(""); // 입력 필드 초기화
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="댓글을 남겨주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Enter 키 이벤트
      />
      <IoArrowUpCircleOutline
        className={style.icon}
        onClick={handleSubmit} // 아이콘 클릭 이벤트
      />

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
