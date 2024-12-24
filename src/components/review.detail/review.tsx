"use client";

import ReviewButton from "../review/reviewButton";
import style from "./review.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Alert from "../alert";
import { useRecoilState } from "recoil";
import { reviewHelpState, reviewIsHelpState } from "@/recoil/reviewFamily";

export default function Review({
  name,
  date,
  content,
  reviewId,
  onClick,
  productName,
}: {
  productName: string;
  name: string;
  date: string;
  content: string;
  reviewId: number;
  onClick?: (e?: React.ChangeEvent<HTMLAllCollection>) => void;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = String(searchParams.get("productId"));

  const [help, setHelp] = useRecoilState(reviewHelpState(reviewId));
  const [isHelp, setIsHelp] = useRecoilState(reviewIsHelpState(reviewId));

  if (!productId)
    return (
      <Alert
        title="잘못된 요청입니다. 다시 시도해 주세요."
        setModalState={() => router.back()}
      />
    );

  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.infoWrap}>
          <p className={style.name}>{name}</p>
          <p className={style.date}>{date} 촬영</p>
        </div>
        <HiOutlineDotsHorizontal className={style.icon} onClick={onClick} />
      </div>
      <p className={style.productName}>{productName}</p>
      <p className={style.content}>{content}</p>
      <ReviewButton
        setHelp={setHelp}
        setIsHelp={setIsHelp}
        reviewId={reviewId}
        helpCnt={help}
        isHelped={isHelp}
      />
    </div>
  );
}
