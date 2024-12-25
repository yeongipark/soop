"use client";

import style from "./page.module.css";
import apiClient from "@/util/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/modal";
import Setting from "@/components/review.my/setting";
import { useState } from "react";
import Confirm from "@/components/confirm";
import { useRouter } from "next/navigation";
import ReviewCard from "@/components/review.my/reviewCard";
import ProtectedPage from "@/components/protectedPage";
import Loading from "@/components/loading/loading";

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

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [settingModal, setSettingModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewId, setReviewId] = useState(0);
  const [reviewData, setReviewData] = useState<ServerResponse | null>(null);

  const handleSettingBtn = (reviewId: number, data: ServerResponse) => {
    if (!settingModal) {
      setReviewId(reviewId);
      setReviewData(data);
      setSettingModal(true);
    }
  };

  const handleDeleteBtn = () => {
    if (!deleteModal) {
      setSettingModal(false);
      setDeleteModal(true);
    }
  };

  const handleEditBtn = () => {
    if (!reviewData) return;
    const query = new URLSearchParams({
      productName: reviewData.productResponse.name,
      productImage: reviewData.productResponse.thumbnail,
      productPrice: String(reviewData.productResponse.price),
      reviewContent: String(reviewData.reviewResponse.content),
    }).toString();
    router.push(`/review/edit/${reviewId}?${query}`);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
    refetchOnMount: true,
  });

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

  return (
    <ProtectedPage>
      <div>
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
        <p className={style.title}>내가 남긴 리뷰</p>
        <p className={style.subTitle}>등록한 리뷰 {data?.length ?? 0}건</p>
        <div className={style.reviewWrap}>
          {isLoading ? (
            <Loading text="로딩중.." />
          ) : (
            data?.map((review) => (
              <ReviewCard
                commentCnt={review.reviewResponse.commentCnt}
                content={review.reviewResponse.content}
                helpCnt={+review.reviewResponse.helpCnt}
                isHelped={review.reviewResponse.isHelped}
                nickname={review.reviewResponse.nickname}
                reviewId={review.reviewResponse.reviewId}
                shootDate={review.reviewResponse.shootDate}
                key={review.reviewResponse.reviewId}
                productName={review.productResponse.name}
                onClick={() =>
                  handleSettingBtn(review.reviewResponse.reviewId, review)
                }
              />
            ))
          )}
        </div>
      </div>
    </ProtectedPage>
  );
}

async function getMyReviews(): Promise<ServerResponseArray> {
  const res = await apiClient.get("/api/reviews/my");
  return res.data;
}

async function deleteReview(reviewId: number | string) {
  await apiClient.delete(`/api/reviews/${reviewId}`);
}
