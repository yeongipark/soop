import Image from "next/image";
import style from "./card.module.css";

export default function Card({
  reservationType,
  handleMenuButtonClick,
  left,
  right,
  imgUrl,
  imgTitle,
  date,
}: {
  reservationType: keyof typeof ReservationStatusType;
  handleMenuButtonClick: () => void;
  left: () => void;
  right: () => void;
  imgUrl: string;
  imgTitle: string;
  date: string;
}) {
  const texts = ReservationStatusType[reservationType];

  return (
    <div className={style.container}>
      <a href="/reservation/detail" className={style.detail}>
        예약 상세 {">"}
      </a>
      <p className={style.title}>{texts.title}</p>
      <p className={style.subTitle}>{texts.subTitle}</p>
      <div className={style.productWrap}>
        <div className={style.imageContainer}>
          <Image
            alt="상품 사진"
            src={imgUrl}
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover" // 이미지 크기 조정 시 비율 유지
          />
        </div>
        <div className={style.info}>
          <p>{imgTitle}</p>
          <p>{date}촬영 예정</p>
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

const ReservationStatusType = {
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
    title: "촬영이 5일 남았어요!",
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
    title: "촬영 완료!",
    subTitle: "리뷰 작성 부탁드립니다 :)",
    button1: "다시 예약",
    button2: "리뷰 작성",
  },
  CANCELED: {
    title: "촬영이 취소되었어요.",
    subTitle: "",
    button1: "다시 예약",
    button2: "문의 하기",
  },
};
