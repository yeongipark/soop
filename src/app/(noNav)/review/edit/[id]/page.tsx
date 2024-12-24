"use client";

import style from "./page.module.css";
import Alert from "@/components/alert";
import apiClient from "@/util/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Page({ params }: { params: { id: number } }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const reviewId = params.id;
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");
  const productImage = searchParams.get("productImage");
  const productPrice = searchParams.get("productPrice");
  const reviewContent = searchParams.get("reviewContent");

  const [content, setContent] = useState(reviewContent!);

  const { mutate, isPending } = useMutation({
    mutationFn: () => postReview(reviewId, content),
    onSuccess: () => {
      router.replace("/complete/review");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      router.replace("/review/my");
    },
  });

  // 조건 수정: 각 값이 없는 경우 Alert 반환
  if (!productName || !productImage || !productPrice || !reviewContent) {
    return (
      <Alert
        title="잘못된 접근입니다. 다시 시도해 주세요."
        setModalState={() => router.back()}
      />
    );
  }

  // 최대 글자 수 제한
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 500) {
      setContent(newValue);
    }
  };

  const handleSubmit = () => {
    mutate();
  };

  const disAbled =
    content.length < 10 || isPending || reviewContent === content;

  return (
    <div>
      <p className={style.title}>리뷰 수정정</p>
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
          disabled={disAbled}
          className={`${!disAbled && style.active}`}
          onClick={handleSubmit}
        >
          {isPending ? "수정중..." : "수정하기"}
        </button>
      </div>
    </div>
  );
}

async function postReview(id: number, content: string): Promise<void> {
  await apiClient.patch(`/api/reviews/${id}`, {
    content,
  });
}
