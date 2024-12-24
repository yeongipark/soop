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
import apiClient from "@/util/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { reservationIdState } from "@/recoil/reservationIdAtom";

type ActionFunction = (id: number) => void;

type FunctionsType = {
  [key in ReservationStatusTypeKey]: {
    left: ActionFunction;
    right: ActionFunction;
  };
};

interface DataType {
  id: number;
  productName: string;
  productImage: string;
  shootDate: string;
  statusType: ReservationStatusTypeKey;
}

interface ReservationDetail {
  id: number;
  code: string;
  shootDate: string;
  time: {
    hour: string;
    minute: string;
    second: string;
    nano: string;
  };
  name: string;
  phone: string;
  status: ReservationStatusTypeKey;
  peopleCnt: number;
  isAgreeUpload: boolean;
  notes: string;
  price: number;
  canChange: boolean;
}

export default function Page() {
  const queryClient = useQueryClient();

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

  // 내비게이션에 넘길 state
  const [activeMenu, setActiveMenu] = useState("촬영전");

  // 예약 번호 저장할 state
  const setReservationId = useSetRecoilState(reservationIdState);
  const [reservationId] = useRecoilState(reservationIdState);

  const setId = (id: number) => {
    setReservationId(id);
  };

  const router = useRouter();

  const handleMenuButtonClick = (date: string, id: number) => {
    setId(id);
    setDate(date);
    setMenuModal(true);
  };

  const retryReservation = (id: number) => {
    setId(id);
    router.push("/product");
  };

  // 문의하기
  const inquiry = (id: number) => {
    setId(id);
    window.open("https://open.kakao.com/o/sxFtI9Yg", "_blank");
  };

  const checkAccount = (id: number) => {
    setId(id);
    // 입금 계좌번호 확인하기
    setDepositModal(true);
  };

  const changeReservationDate = (id: number) => {
    setId(id);
    // 현재 예약날짜랑 시간 같이 보내기
    router.push(`/reservation/change`);
  };

  const cancelReservation = (id: number) => {
    setId(id);
    setCancelModal(true);
  };

  const writeReview = (id: number) => {
    setId(id);
    // 리뷰 작성하기
    router.push("/review/write");
  };

  const statusMap: Record<string, string> = {
    촬영전: "BEFORE",
    촬영후: "AFTER",
    취소됨: "CANCELED",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", statusMap[activeMenu]],
    queryFn: () => fetchReservations(statusMap[activeMenu]),
    keepPreviousData: true, // 상태 변경 시 이전 데이터를 유지
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteReservation(id),
    onMutate: async (id: number) => {
      // 이전 캐시 데이터를 snapshot으로 저장
      await queryClient.cancelQueries(["reservations", "BEFORE"]);
      const previousData = queryClient.getQueryData<{ id: number }[]>([
        "reservations",
        "BEFORE",
      ]);

      if (previousData) {
        // 낙관적 업데이트로 id가 같은 항목 제거
        const updatedData = previousData.filter(
          (reservation) => reservation.id !== id
        );
        queryClient.setQueryData(["reservations", "BEFORE"], updatedData);
      }

      // onError에서 롤백을 위해 snapshot 반환
      return { previousData };
    },
    onSettled: () => {
      // 성공 또는 실패 여부와 관계없이 데이터 재요청
      queryClient.invalidateQueries(["reservations", "BEFORE"]);
    },
  });

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const functions: FunctionsType = {
    CANCELED: {
      left: (id: number) => retryReservation(id),
      right: (id: number) => inquiry(id),
    },
    CONFIRM_REQUESTED: {
      left: (id: number) => inquiry(id),
      right: (id: number) => changeReservationDate(id),
    },
    PAYMENT_CONFIRMED: {
      left: (id: number) => inquiry(id),
      right: (id: number) => changeReservationDate(id),
    },
    PENDING_PAYMENT: {
      left: (id: number) => checkAccount(id),
      right: (id: number) => cancelReservation(id),
    },
    REVIEW_COMPLETED: {
      left: (id: number) => retryReservation(id),
      right: (id: number) => writeReview(id),
    },
    SHOOTING_COMPLETED: {
      left: (id: number) => retryReservation(id),
      right: (id: number) => writeReview(id),
    },
  };

  if (isLoading) return "로딩중...";

  return (
    <div>
      <p className={style.title}>촬영 예약내역</p>
      <div className={style.content_wrap}>
        <ReservationCheckNav
          activeMenu={activeMenu}
          handleMenuClick={handleMenuClick}
        />
        {data.map((cardData) => (
          <Card
            key={cardData.id}
            id={cardData.id}
            reservationType={cardData.statusType}
            handleMenuButtonClick={() =>
              handleMenuButtonClick(cardData.shootDate, cardData.id)
            }
            left={() => functions[cardData.statusType].left(cardData.id)}
            right={() => functions[cardData.statusType].right(cardData.id)}
            imgUrl={cardData.productImage}
            imgTitle={cardData.productName}
            date={cardData.shootDate}
          />
        ))}
      </div>

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
          func={() => {
            mutate(reservationId);
            setReservationCancel(true);
          }}
          setModalState={setCancelModal}
        />
      )}
      {depositModal && (
        <Modal type="custom" setModalState={setDepositModal}>
          <DepositModal setModal={setDepositModal} />
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
    </div>
  );
}
// 상태별 예약 정보 호출 함수
async function fetchReservations(status: string): Promise<DataType[]> {
  const res = await apiClient.get(`/api/reservations?status=${status}`);
  return res.data;
}

async function fetchReservationsDetail(
  reservationId: number
): Promise<ReservationDetail> {
  const res = await apiClient.get(`/api/reservations/${reservationId}`);
  return res.data;
}

// 예약 취소
async function deleteReservation(reservationId: number) {
  await apiClient.patch(`/api/reservations/${reservationId}`);
}
