"use client";

import Image from "next/image";
import style from "./page.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@/components/alert";
import apiClient from "@/util/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProtectedPage from "@/components/protectedPage";

export default function Page({ params }: { params: { id: number } }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [content, setContent] = useState("");

  const searchParams = useSearchParams();

  const productName = searchParams.get("productName");
  const productImage = searchParams.get("productImage");
  const productPrice = searchParams.get("productPrice");

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; content: string }) =>
      postReview(data.id, data.content),
    onSuccess: () => {
      router.replace("/complete/review");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservations", "AFTER"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["myReviews"],
        refetchType: "all",
      });
    },
  });

  if (!productName || !productImage || !productPrice)
    return (
      <Alert
        title="잘못된 접근입니다. 다시 시도해 주세요."
        setModalState={() => router.back()}
      />
    );

  // 최대 글자 수 제한
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      setContent(newValue);
    }
  };

  const handleSubmit = () => {
    mutate({ id: params.id, content });
  };

  return (
    <ProtectedPage>
      <div>
        <p className={style.title}>리뷰 작성</p>
        <div className={style.wrap}>
          <div className={style.imgWrap}>
            <Image
              src={productImage} // 이미지 경로
              alt="상품 이미지"
              fill // 부모 요소를 기준으로 꽉 채움
              className={style.productImage}
            />
          </div>
          <div className={style.infoWrap}>
            <p className={style.productName}>{productName}</p>
            <p className={style.productPrice}>
              {Number(productPrice).toLocaleString()}원
            </p>
          </div>
        </div>
        <p className={style.subTitle}>촬영은 어떠셨나요?</p>
        <div className={style.textareaWrap}>
          <textarea
            value={content}
            onChange={handleChange} // 변경된 핸들러
            placeholder="최소 10자 이상 작성해주세요:)"
          ></textarea>
          <p className={style.textLength}>{`${content.length}/500`}</p>
        </div>
        <div className={style.btnWrap}>
          <button
            disabled={content.length < 10 || isPending}
            className={`${content.length >= 10 && !isPending && style.active}`}
            onClick={handleSubmit}
          >
            {isPending ? "등록중..." : "등록하기"}
          </button>
        </div>
      </div>
    </ProtectedPage>
  );
}

async function postReview(id: number, content: string): Promise<void> {
  await apiClient.post("/api/reviews", {
    reservationId: id,
    content,
  });
}
