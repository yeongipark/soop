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
import ProtectedPage from "@/components/protectedPage";
import NoData from "@/components/reservationCheck/noData";
import CardLoading from "@/components/reservationCheck/cardLoading";

interface DataType {
  id: number;
  productName: string;
  productImage: string;
  shootDate: string;
  statusType: ReservationStatusTypeKey;
  productPrice: number;
  code: string;
}

type ActionFunction = (
  id: number,
  productName: string,
  productImage: string,
  productPrice: number
) => void;

// FunctionsType 수정
type FunctionsType = {
  [key in ReservationStatusTypeKey]: {
    left: ActionFunction;
    right: ActionFunction;
  };
};

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
  const [copyCode, setCopyCode] = useState(false);

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
    window.open("http://pf.kakao.com/_dClxdn", "_blank");
  };

  const checkAccount = (id: number) => {
    setId(id);
    // 입금 계좌번호 확인하기
    setDepositModal(true);
  };

  // 예약 번호 복사하기
  const copyReservationId = async (id: number, data: DataType[]) => {
    const findData = data.find((item) => item.id === id);
    if (!findData) return alert("예약번호를 찾을 수 없습니다.");
    await navigator.clipboard.writeText(findData.code.toString());
    setCopyCode(true);
    setMenuModal(false);
  };

  const changeReservationDate = (id: number) => {
    setId(id);
    // 현재 예약날짜랑 시간 같이 보내기
    router.push(`/reservation/change/${id}`);
  };

  const cancelReservation = (id: number) => {
    setId(id);
    setCancelModal(true);
  };

  // 리뷰 보기
  const showReview = () => {
    router.push(`/review/my`);
  };

  const writeReview = (
    id: number,
    productName: string,
    productImage: string,
    productPrice: number
  ) => {
    setId(id);

    // 리뷰 작성하기
    router.push(
      `/review/write/${id}?productName=${encodeURIComponent(
        productName
      )}&productImage=${encodeURIComponent(
        productImage
      )}&productPrice=${productPrice}`
    );
  };

  const statusMap: Record<string, string> = {
    촬영전: "BEFORE",
    촬영후: "AFTER",
    취소됨: "CANCELED",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["reservations", statusMap[activeMenu]],
    queryFn: () => fetchReservations(statusMap[activeMenu]),
  });

  // 예약 취소
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteReservation(id),

    onError: () => {
      alert("5일전까지 취소 가능합니다.");
    },
    onSuccess: () => {
      setReservationCancel(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations", "BEFORE"] });
    },
  });

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const functions: FunctionsType = {
    CANCELED: {
      left: retryReservation,
      right: inquiry,
    },
    CONFIRM_REQUESTED: {
      left: inquiry,
      right: changeReservationDate,
    },
    PAYMENT_CONFIRMED: {
      left: inquiry,
      right: changeReservationDate,
    },
    PENDING_PAYMENT: {
      left: checkAccount,
      right: cancelReservation,
    },
    REVIEW_COMPLETED: {
      left: retryReservation,
      right: showReview,
    },
    SHOOTING_COMPLETED: {
      left: retryReservation,
      right: writeReview,
    },
  };

  return (
    <ProtectedPage>
      <div style={{ paddingBottom: "10px" }}>
        <p className={style.title}>촬영 예약내역</p>
        <div className={style.content_wrap}>
          <ReservationCheckNav
            activeMenu={activeMenu}
            handleMenuClick={handleMenuClick}
          />
          <div>
            {isLoading ? (
              <CardLoading />
            ) : (
              data?.map((cardData) => (
                <Card
                  key={cardData.id}
                  id={cardData.id}
                  reservationType={cardData.statusType}
                  handleMenuButtonClick={() =>
                    handleMenuButtonClick(cardData.shootDate, cardData.id)
                  }
                  left={() =>
                    functions[cardData.statusType].left(
                      cardData.id,
                      cardData.productName,
                      cardData.productImage,
                      cardData.productPrice
                    )
                  }
                  right={() =>
                    functions[cardData.statusType].right(
                      cardData.id,
                      cardData.productName,
                      cardData.productImage,
                      cardData.productPrice
                    )
                  }
                  imgUrl={cardData.productImage}
                  imgTitle={cardData.productName}
                  date={cardData.shootDate}
                />
              ))
            )}
            <div style={{ width: "100%", height: "10px" }}></div>
          </div>
          {data?.length === 0 && <NoData />}
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
              handleCopy={() => copyReservationId(reservationId, data ?? [])}
              activeMenu={activeMenu}
              setCanceled={setCanceled}
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
        {copyCode && (
          <Alert
            type="info"
            title="예약번호 복사 완료"
            setModalState={setCopyCode}
          />
        )}
      </div>
    </ProtectedPage>
  );
}
// 상태별 예약 정보 호출 함수
async function fetchReservations(status: string): Promise<DataType[]> {
  const res = await apiClient.get(`/api/reservations?status=${status}`);
  return res.data;
}

// 예약 취소
async function deleteReservation(reservationId: number) {
  await apiClient.patch(`/api/reservations/${reservationId}`);
}
