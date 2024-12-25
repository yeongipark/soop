"use client";

import ReviewButton from "../review/reviewButton";
import style from "./review.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Alert from "../alert";
import { useRecoilState } from "recoil";
import { reviewHelpState, reviewIsHelpState } from "@/recoil/reviewFamily";
import { useEffect, useState } from "react";
import Confirm from "../confirm";
import Modal from "../modal";
import Setting from "../review.my/setting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/util/axios";

export default function Review({
  name,
  date,
  content,
  reviewId,
  productName,
  price,
  thumbnail,
}: {
  productName: string;
  name: string;
  date: string;
  content: string;
  reviewId: number;
  price: number;
  thumbnail: string;
}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = String(searchParams.get("productId"));

  const [deleteModal, setDeleteModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  const [nickname, setNickname] = useState<string>("");

  const [help, setHelp] = useRecoilState(reviewHelpState(reviewId));
  const [isHelp, setIsHelp] = useRecoilState(reviewIsHelpState(reviewId));

  // 댓글 삭제
  const { mutate } = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onMutate: () => {
      const previousData = queryClient.getQueryData<ServerResponseArray>([
        "myReviews",
      ]);

      if (previousData) {
        queryClient.setQueryData(
          ["myReviews"],
          previousData.filter(
            (review) => review.reviewResponse.reviewId !== reviewId
          )
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    },
  });

  useEffect(() => {
    setNickname(localStorage.getItem("nickname") ?? "");
    console.log(productId);
  }, []);

  const handleEditBtn = () => {
    const query = new URLSearchParams({
      productName: name,
      productImage: thumbnail,
      productPrice: String(price),
      reviewContent: String(content),
    }).toString();
    router.push(`/review/edit/${reviewId}?${query}`);
  };

  const handleDeleteBtn = () => {
    if (!deleteModal) {
      setSettingModal(false);
      setDeleteModal(true);
    }
  };

  if (productId === "null" || !productId)
    return (
      <Alert
        title="잘못된 요청입니다. 다시 시도해 주세요."
        setModalState={() => router.back()}
      />
    );

  return (
    <div className={style.container}>
      {deleteModal && (
        <Confirm
          setModalState={setDeleteModal}
          title="리뷰를 삭제하시겠습니까?"
          ok="네"
          func={mutate}
        />
      )}
      {settingModal && (
        <Modal width="30%" type="custom" setModalState={setSettingModal}>
          <Setting
            setModalState={setSettingModal}
            handleDeleteBtn={handleDeleteBtn}
            handleEditBtn={handleEditBtn}
          />
        </Modal>
      )}
      <div className={style.info}>
        <div className={style.infoWrap}>
          <p className={style.name}>{name}</p>
          <p className={style.date}>{date} 촬영</p>
        </div>
        {nickname === name ? (
          <HiOutlineDotsHorizontal
            className={style.icon}
            onClick={() => setSettingModal(true)}
          />
        ) : null}
      </div>
      <p className={style.productName}>{productName}</p>
      <p className={style.content}>{content}</p>
      <ReviewButton
        setHelp={setHelp}
        setIsHelp={setIsHelp}
        reviewId={reviewId}
        helpCnt={help}
        isHelped={isHelp}
        productId={+productId}
      />
    </div>
  );
}

async function deleteReview(reviewId: number | string) {
  await apiClient.delete(`/api/reviews/${reviewId}`);
}

type ReviewResponse = {
  reviewId: number;
  nickname: string;
  content: string;
  shootDate: string;
  helpCnt: string;
  isHelped: boolean;
  commentCnt: number;
};

type ProductResponse = {
  id: number;
  name: string;
  thumbnail: string;
  summary: string;
  price: number;
};

type ServerResponse = {
  reviewResponse: ReviewResponse;
  productResponse: ProductResponse;
};

type ServerResponseArray = ServerResponse[];
