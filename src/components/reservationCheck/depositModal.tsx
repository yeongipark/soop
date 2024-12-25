"use client";

import { useState } from "react";
import style from "./depositModal.module.css";
import apiClient from "@/util/axios";
import { useRecoilState } from "recoil";
import { reservationIdState } from "@/recoil/reservationIdAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function patchReservationPayment(
  reservationId: number,
  name: string,
  date: string
) {
  return apiClient.patch(`/api/reservations/${reservationId}/payment`, {
    payerName: name,
    paymentDate: date,
  });
}

export default function DepositModal({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [reservationId] = useRecoilState(reservationIdState);

  const queryClient = useQueryClient();

  // 정규표현식으로 검증
  const isNameValid = name.length >= 2; // 이름이 2글자 이상인지 확인
  const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(date); // 날짜가 "YYYY-MM-DD" 형식인지 확인
  const isFormValid = isNameValid && isDateValid;

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: () => patchReservationPayment(reservationId, name, date),
    onMutate: async () => {
      const previousData = queryClient.getQueryData(["reservations", "BEFORE"]);

      // 낙관적 업데이트
      queryClient.setQueryData(["reservations", "BEFORE"], (old: any) =>
        old.map((reservation: any) =>
          reservation.id === reservationId
            ? { ...reservation, statusType: "PAYMENT_CONFIRMED" } // 상태를 업데이트
            : reservation
        )
      );

      return { previousData };
    },
    onError: (context: any) => {
      // 오류 발생 시 이전 데이터로 복원
      alert("잘못된 날짜입니다.");
      queryClient.invalidateQueries({ queryKey: ["reservations", "BEFORE"] });
      queryClient.setQueryData(
        ["reservations", "BEFORE"],
        context.previousData
      );
    },
    onSuccess: () => {
      // 성공 시 데이터를 다시 가져오기
      queryClient.invalidateQueries(["reservations", "BEFORE"]);
    },
  });

  const handleSubmit = () => {
    if (isFormValid) {
      mutation.mutate(); // 요청 실행
      setModal(false);
    }
  };

  return (
    <div className={style.container}>
      <p className={style.title}>예약금 입금 계좌 안내</p>
      <p className={style.number}>
        28313037982 대구은행 <br />
        박수빈
      </p>
      <p className={style.text}>
        예약금 입금 후 반드시 확인 요청을 눌러주세요.
      </p>

      <div className={style.inputWrap}>
        <input
          type="text"
          placeholder="입금자명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="입금 날짜 (2024-03-05)"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button
        disabled={!isFormValid || mutation.isLoading} // 비활성화 조건 추가
        onClick={handleSubmit}
        className={isFormValid ? style.btn : style.disabledBtn}
      >
        {"입금 확인 요청"}
      </button>
    </div>
  );
}
