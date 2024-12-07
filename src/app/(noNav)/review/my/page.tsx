"use client";

import Review from "@/components/review.detail/review";
import style from "./page.module.css";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/modal";
import Setting from "@/components/review.my/setting";
import { useState } from "react";
import Confirm from "@/components/confirm";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

async function getMyReviews(): Promise<ServerResponseArray> {
  const res = await apiClient.get("/api/reviews/my");
  return res.data;
}

export default function Page() {
  const router = useRouter();

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
    const query = new URLSearchParams(reviewData as ServerResponse).toString(); // 쿼리 문자열 생성
    router.push({
      pa,
    });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["myReviews"],
    queryFn: getMyReviews,
    refetchOnMount: false,
  });

  if (isLoading) return "로딩중...";

  return (
    <div>
      {deleteModal && (
        <Confirm
          setModalState={setDeleteModal}
          title="리뷰를 삭제하시겠습니까?"
          ok="네"
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
        {data?.map((review) => (
          <Link
            key={review.reviewResponse.reviewId}
            href={{
              pathname: "/review/detail",
              query: {
                reviewId: review.reviewResponse.reviewId,
                content: review.reviewResponse.content,
                shootDate: review.reviewResponse.shootDate,
                helpCnt: review.reviewResponse.helpCnt,
                isHelped: review.reviewResponse.isHelped,
                nickname: review.reviewResponse.nickname,
              },
            }}
          >
            <Review
              key={review.reviewResponse.reviewId}
              content={review.reviewResponse.content}
              date={review.reviewResponse.shootDate}
              helpCnt={review.reviewResponse.helpCnt}
              isHelped={review.reviewResponse.isHelped}
              name={review.reviewResponse.nickname}
              onClick={(e) => {
                e.preventDefault();
                handleSettingBtn(review.reviewResponse.reviewId, review);
              }}
            />
          </Link>
        ))}
        <Link
          href={{
            pathname: "/review/detail",
            query: {
              reviewId: 3,
              content: "하이요",
              shootDate: "2024-11-08",
              helpCnt: "3",
              isHelped: true,
              nickname: "박연기",
            },
          }}
        >
          <Review
            content="하이요"
            date="2024-11-08"
            helpCnt="3"
            isHelped={true}
            name={"박연기"}
            onClick={(e) => {
              e.preventDefault();
              handleSettingBtn(3);
            }}
          />
        </Link>
      </div>
    </div>
  );
}
