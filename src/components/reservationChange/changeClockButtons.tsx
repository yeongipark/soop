"use client";

import { useEffect, useState } from "react";
import style from "./changeClockButtons.module.css";
import NextButton from "../nextButton";
import Confirm from "../confirm";
import { TimeType } from "@/app/(noFooter)/reserve/page";
import apiClient from "@/util/axios";
import { useRecoilState } from "recoil";
import { reservationIdState } from "@/recoil/reservationIdAtom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function ChangeClockButtons({
  basicDate,
  basicClock,
  selectDate,
  timeData = [],
}: {
  basicDate: string;
  basicClock: string;
  selectDate: string;
  timeData: TimeType[];
}) {
  // selectClock의 초기 상태를 조건에 따라 설정
  const [selectClock, setSelectClock] = useState<string | null>(basicClock);

  const [confirmState, setConfirmState] = useState(false);

  const [timeSlotId, setTimeSlotId] = useState(0);

  const [reservationId] = useRecoilState(reservationIdState);

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectClock(null);
  }, [selectDate]);

  const { mutate } = useMutation({
    mutationFn: () => changeReservation(reservationId, timeSlotId),
    onMutate: async () => {
      // 이전 캐시 데이터를 snapshot으로 저장
      await queryClient.cancelQueries(["reservations", "BEFORE"]);
      await queryClient.cancelQueries(["reservationChange", reservationId]);
      const previousData = queryClient.getQueryData<{ id: number }[]>([
        "reservations",
        "BEFORE",
      ]);

      if (previousData) {
        // 낙관적 업데이트로 id가 같은 항목 제거
        const updatedData = previousData.map((reservation) => {
          if (reservation.id === reservationId) {
            return { ...reservation, shootDate: selectDate };
          } else return reservation;
        });
        queryClient.setQueryData(["reservations", "BEFORE"], updatedData);
      }

      // onError에서 롤백을 위해 snapshot 반환
      return { previousData };
    },
    onSettled: () => {
      // 성공 또는 실패 여부와 관계없이 데이터 재요청
      queryClient.invalidateQueries({ queryKey: ["reservations", "BEFORE"] });
      queryClient.invalidateQueries({
        queryKey: ["reservationChange", reservationId],
      });
    },
  });

  useEffect(() => {
    setSelectClock(() => {
      return basicDate === selectDate ? basicClock : "";
    });
  }, [selectDate]);

  // 시간 클릭 핸들러 함수
  const handleOnClockBtn = (clock: string) => {
    const id = +findTime(clock, timeData);
    setTimeSlotId(id);
    setSelectClock(clock);
  };

  // 변경 하기 함수 핸들러
  const handleOnNextBtn = () => {
    if (!confirmState) {
      setConfirmState(true);
    }
  };

  // 예약 가능 여부를 계산
  const availabilityMap = new Map<string, boolean>();
  timeData.forEach(({ startTime, isAvailable }) => {
    const formattedTime = formatTime(startTime);
    availabilityMap.set(formattedTime, isAvailable); // 시간별 예약 가능 여부 저장
  });

  const am = ["10:00", "10:30", "11:00", "11:30"];
  const pm1 = ["13:00", "13:30", "14:00", "14:30"];
  const pm2 = ["15:00", "15:30", "16:00", "16:30"];

  // NextButton 활성화 조건
  const isNextButtonEnabled =
    (basicDate === selectDate && selectClock !== basicClock) ||
    (basicDate !== selectDate && selectClock !== "");

  return (
    <div className={style.container}>
      {confirmState && (
        <Confirm
          setModalState={setConfirmState}
          title="예약을 변경하시겠습니까?"
          subTitle={
            <>
              변경은 기간 내 한 번만 가능합니다.
              <br />
              <br />
              <br />
              변경 전 날짜: {basicDate} {basicClock}
              <br />
              <span style={{ color: "red" }}>
                변경 후 날짜: {selectDate} {selectClock}
              </span>
            </>
          }
          func={() => {
            mutate();
            router.back();
          }}
          ok="변경"
        />
      )}
      <p>오전</p>
      <div>
        <div className={style.buttonWrap}>
          {am.map((clock) => {
            const isAvailable = availabilityMap.get(clock) || false; // 예약 가능 여부
            const isSelected = selectClock === clock; // 선택 여부

            return (
              <div key={clock}>
                <button
                  onClick={() => handleOnClockBtn(clock)}
                  className={`${
                    isAvailable ? style.possibleBtn : style.impossibleBtn
                  } ${isSelected && style.selected}`}
                  disabled={!isAvailable} // 예약마감 버튼 비활성화
                >
                  <p className={style.clockText}>{clock}</p>
                  <p
                    className={isAvailable ? style.possible : style.impossible}
                  >
                    {isAvailable ? "예약가능" : "예약마감"}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <p>오후</p>
      <div className={style.buttons}>
        <div className={style.buttonWrap}>
          {pm1.map((clock) => {
            const isAvailable = availabilityMap.get(clock) || false;
            const isSelected = selectClock === clock;

            return (
              <div key={clock}>
                <button
                  onClick={() => handleOnClockBtn(clock)}
                  className={`${
                    isAvailable ? style.possibleBtn : style.impossibleBtn
                  } ${isSelected && style.selected}`}
                  disabled={!isAvailable}
                >
                  <p className={style.clockText}>{clock}</p>
                  <p
                    className={isAvailable ? style.possible : style.impossible}
                  >
                    {isAvailable ? "예약가능" : "예약마감"}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
        <div className={style.buttonWrap}>
          {pm2.map((clock) => {
            const isAvailable = availabilityMap.get(clock) || false;
            const isSelected = selectClock === clock;

            return (
              <div key={clock}>
                <button
                  onClick={() => handleOnClockBtn(clock)}
                  className={`${
                    isAvailable ? style.possibleBtn : style.impossibleBtn
                  } ${isSelected && style.selected}`}
                  disabled={!isAvailable}
                >
                  <p className={style.clockText}>{clock}</p>
                  <p
                    className={isAvailable ? style.possible : style.impossible}
                  >
                    {isAvailable ? "예약가능" : "예약마감"}
                  </p>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <NextButton
        isEnabled={isNextButtonEnabled}
        onClick={handleOnNextBtn}
        label="변경 하기"
      />
    </div>
  );
}

// 시간을 12시간제로 변환하는 함수
function formatTime(serverTime: string): string {
  const [hour, minute] = serverTime.split(":").map(Number);
  return `${hour}:${minute.toString().padStart(2, "0")}`;
}

function findTime(time: string, timeData: TimeType[]) {
  return timeData.find((data) => {
    const curTime = formatTime(data.startTime);
    return curTime == time;
  })?.id;
}

async function changeReservation(id, timeSlot) {
  await apiClient.patch(`/api/reservations/${id}/time`, {
    timeSlotId: timeSlot,
  });
}
