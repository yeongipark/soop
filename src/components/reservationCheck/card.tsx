import Image from "next/image";
import style from "./card.module.css";
import Link from "next/link";
import { differenceInDays, isToday } from "date-fns";

export default function Card({
  id,
  reservationType,
  handleMenuButtonClick,
  left,
  right,
  imgUrl,
  imgTitle,
  date, // 촬영 예정 날짜
}: {
  id: number;
  reservationType: keyof typeof ReservationStatus;
  handleMenuButtonClick: () => void;
  left: () => void;
  right: () => void;
  imgUrl: string;
  imgTitle: string;
  date: string; // "YYYY-MM-DD" 형식
}) {
  const shootDate = new Date(date); // 촬영 날짜를 Date 객체로 변환
  const today = new Date();

  let dynamicTitle = "";

  console.log(shootDate, today);
  if (reservationType === "PAYMENT_CONFIRMED") {
    if (isToday(shootDate)) {
      dynamicTitle = "촬영 당일입니다!";
    } else {
      const daysLeft = differenceInDays(shootDate, today) + 1;
      console.log(daysLeft);
      dynamicTitle =
        daysLeft > 0 ? `촬영이 ${daysLeft}일 남았어요!` : "촬영이 지났습니다.";
    }
  }

  const texts = ReservationStatus[reservationType];

  return (
    <div className={style.container}>
      <Link href={`/reservation/detail/${id}`} className={style.detail}>
        예약 상세 {">"}
      </Link>
      <p className={style.title}>
        {reservationType === "PAYMENT_CONFIRMED" ? dynamicTitle : texts.title}
      </p>
      <p className={style.subTitle}>{texts.subTitle}</p>
      <div className={style.productWrap}>
        <div className={style.imageContainer}>
          <Image
            alt="상품 사진"
            src={`https://image.re-bin.kr/rebin/${imgUrl}`}
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover" // 이미지 크기 조정 시 비율 유지
          />
        </div>
        <div className={style.info}>
          <p>{imgTitle}</p>
          <p>{date} 촬영 예정</p>
        </div>
      </div>
      <div className={style.buttonWrap}>
        <button onClick={left}>{texts.button1}</button>
        <button onClick={right}>{texts.button2}</button>
        <button onClick={handleMenuButtonClick}>...</button>
      </div>
    </div>
  );
}

export const ReservationStatus = {
  PENDING_PAYMENT: {
    title: "예약금 전송 전이에요.",
    subTitle: "예약금 입금 후 확인 요청을 보내주세요.",
    button1: "입금 계좌 확인",
    button2: "예약 취소",
  },
  CONFIRM_REQUESTED: {
    title: "아직 입금 확인 중이에요!",
    subTitle: "빠르게 처리해드릴게요.",
    button1: "문의하기",
    button2: "예약 변경",
  },
  PAYMENT_CONFIRMED: {
    title: "", // 동적으로 설정됨
    subTitle: "예쁘게 찍어드릴게요.",
    button1: "문의하기",
    button2: "예약 변경",
  },
  SHOOTING_COMPLETED: {
    title: "촬영 완료!",
    subTitle: "리뷰 작성 부탁드립니다 :)",
    button1: "다시 예약",
    button2: "리뷰 작성",
  },
  REVIEW_COMPLETED: {
    title: "리뷰 작성 완료!",
    subTitle: "다음에 또 이용해주세요 :)",
    button1: "다시 예약",
    button2: "리뷰 보기",
  },
  CANCELED: {
    title: "촬영이 취소되었어요.",
    subTitle: "",
    button1: "다시 예약",
    button2: "문의 하기",
  },
};
