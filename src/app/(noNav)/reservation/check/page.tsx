"use client";

import Card from "@/components/reservationCheck/card";
import style from "./page.module.css";
import ReservationCheckNav from "@/components/reservationCheck/reservationCheckNav";
import Modal from "@/components/modal";
import DepositModal from "@/components/reservationCheck/depositModal";
import MenuModal from "@/components/reservationCheck/menuModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Confirm from "@/components/confirm";
import { ReservationStatusTypeKey } from "@/types";
import Alert from "@/components/alert";

// 공통 함수 시그니처 타입 정의
type ActionFunction = () => void;

// 각 상태에서 호출 가능한 함수 정의
type FunctionsType = {
  [key in ReservationStatusTypeKey]: {
    left: ActionFunction;
    right: ActionFunction;
  };
};

const data: {
  id: number;
  type: ReservationStatusTypeKey;
  imgUrl: string;
  imgTitle: string;
  date: string;
}[] = [
  {
    id: 1,
    type: "CANCELED",
    imgUrl: "/프로필사진.jpg",
    imgTitle: "개인 프로필",
    date: "2024. 09. 23 ",
  },
  {
    id: 2,
    type: "CONFIRM_REQUESTED",
    imgUrl: "/프로필사진.jpg",
    imgTitle: "개인 프로필",
    date: "2024. 12. 23 ",
  },
  {
    id: 3,
    type: "PAYMENT_CONFIRMED",
    imgUrl: "/프로필사진.jpg",
    imgTitle: "개인 프로필",
    date: "2024. 09. 23 ",
  },
  {
    id: 4,
    type: "PENDING_PAYMENT",
    imgUrl: "/프로필사진.jpg",
    imgTitle: "개인 프로필",
    date: "2024. 09. 23 ",
  },
  {
    id: 5,
    type: "REVIEW_COMPLETED",
    imgUrl: "/프로필사진.jpg",
    imgTitle: "개인 프로필",
    date: "2024. 09. 23 ",
  },
  {
    id: 6,
    type: "SHOOTING_COMPLETED",
    imgUrl: "/프로필사진.jpg",
    imgTitle: "개인 프로필",
    date: "2024. 09. 23 ",
  },
];

export default function Page() {
  // 모달 관련 state
  const [depositModal, setDepositModal] = useState(false);
  const [menuModal, setMenuModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  // Alert 관련 state
  const [reservationState, setReservationState] = useState(false);
  const [reservationChange, setReservationChange] = useState(false);
  const [reservationCancel, setReservationCancel] = useState(false);
  const [invalidCancel, setInvalidCancel] = useState(false);
  const [invalidChange, setInvalidChange] = useState(false);
  const [canceled, setCanceled] = useState(false);

  // 모달에 넘길 데이터 관련 state
  const [date, setDate] = useState("");

  const router = useRouter();

  const handleMenuButtonClick = (date: string) => {
    setDate(date);
    setMenuModal(true);
  };

  const retryReservation = () => {
    router.push("/product");
  };

  const inquiry = () => {
    //문의하기
  };

  const checkAccount = () => {
    // 입금 계좌번호 확인하기
    setDepositModal(true);
  };

  const changeReservationDate = () => {
    // 현재 예약날짜랑 시간 같이 보내기
    router.push("/reservation/change");
  };

  const cancelReservation = () => {
    setCancelModal(true);
  };

  const writeReview = () => {
    // 리뷰 작성하기
    router.push("/review/write");
  };

  const functions: FunctionsType = {
    CANCELED: {
      left: retryReservation,
      right: inquiry,
    },
    CONFIRM_REQUESTED: {
      left: checkAccount,
      right: changeReservationDate,
    },
    PAYMENT_CONFIRMED: {
      left: inquiry,
      right: changeReservationDate,
    },
    PENDING_PAYMENT: {
      left: changeReservationDate,
      right: cancelReservation,
    },
    REVIEW_COMPLETED: {
      left: retryReservation,
      right: writeReview,
    },
    SHOOTING_COMPLETED: {
      left: retryReservation,
      right: writeReview,
    },
  };

  return (
    <div>
      {cancelModal && (
        <Confirm
          title="예약을 취소하시겠습니까?"
          subTitle={
            <span>
              촬영일 기준
              <br />
              14일 전 90% 환불
              <br />
              7일 전~당일 환불 불가
            </span>
          }
          ok="네"
          setModalState={setCancelModal}
        />
      )}
      {depositModal && (
        <Modal type="custom" setModalState={setDepositModal}>
          <DepositModal />
        </Modal>
      )}
      {menuModal && (
        <Modal type="custom" setModalState={setMenuModal}>
          <MenuModal
            setCancelModal={setCancelModal}
            setMenuModal={setMenuModal}
            setInvalidCancel={setInvalidCancel}
            date={date}
          />
        </Modal>
      )}

      {reservationState && (
        <Alert
          type="info"
          title="예약 상태"
          setModalState={setReservationState}
          subTitle={
            <span>
              예약금 입금 후 반드시
              <br />
              예약 내역 페이지에서{" "}
              <span style={{ color: "var(--main)" }}>
                입금 계좌 확인 {">"} 입금 확인 요청
              </span>
              버튼을 눌러주세요.
            </span>
          }
        />
      )}
      {reservationChange && (
        <Alert
          type="info"
          title="예약 변경"
          setModalState={setReservationChange}
          subTitle={
            <span>
              예약 변경은 기간 내 한번 가능하며
              <br />
              촬영 당일에는 변경할 수 없습니다.
            </span>
          }
        />
      )}
      {reservationCancel && (
        <Alert
          type={undefined}
          title="예약이 취소되었습니다."
          setModalState={setReservationCancel}
          subTitle={
            <span>
              예약금 환불에 대해서는
              <br />
              예약자 연락처로 따로 연락드리겠습니다.
            </span>
          }
        />
      )}
      {invalidCancel && (
        <Alert
          type="cancel"
          title="취소 가능 기간이 아닙니다."
          setModalState={setInvalidCancel}
        />
      )}
      {invalidChange && (
        <Alert
          type="cancel"
          title="예약 변경 불가"
          setModalState={setInvalidChange}
          subTitle={
            <span>
              예약 변경은 기간 내 한번 가능하며
              <br />
              촬영 당일에는 변경할 수 없습니다.
            </span>
          }
        />
      )}
      {canceled && (
        <Alert
          type="cancel"
          title="이미 취소된 예약입니다."
          setModalState={setCanceled}
        />
      )}

      <p className={style.title}>촬영 예약내역</p>
      <div className={style.content_wrap}>
        <ReservationCheckNav />
        {data.map((cardData) => (
          <Card
            key={cardData.id}
            reservationType={cardData.type}
            handleMenuButtonClick={() => handleMenuButtonClick(cardData.date)}
            left={functions[cardData.type].left}
            right={functions[cardData.type].right}
            imgUrl={cardData.imgUrl}
            imgTitle={cardData.imgTitle}
            date={cardData.date}
          />
        ))}
      </div>
    </div>
  );
}
