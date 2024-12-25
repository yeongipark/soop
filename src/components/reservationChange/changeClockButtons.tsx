"use client";

import { useEffect, useState } from "react";
import style from "./changeClockButtons.module.css";
import NextButton from "../nextButton";
import Confirm from "../confirm";
import { TimeType } from "@/app/(noFooter)/reserve/page";
import apiClient from "@/util/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loading from "../loading/loading";

export default function ChangeClockButtons({
  reservationId,
  basicDate,
  basicClock,
  selectDate,
}: {
  reservationId: string | number;
  basicDate: string;
  basicClock: string;
  selectDate: string;
}) {
  // selectClock의 초기 상태를 조건에 따라 설정
  const [selectClock, setSelectClock] = useState<string | null>(null);

  const [confirmState, setConfirmState] = useState(false);

  const [timeSlotId, setTimeSlotId] = useState(0);

  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectClock(null);
  }, [selectDate]);

  const { data: timeData, isLoading } = useQuery({
    queryKey: ["timeSlot", selectDate],
    queryFn: () => getTimeSlot(selectDate),
  });

  const { mutate } = useMutation({
    mutationFn: () => changeReservation(reservationId, timeSlotId),
    onMutate: async () => {
      // 이전 캐시 데이터를 snapshot으로 저장
      await queryClient.cancelQueries({ queryKey: ["reservations", "BEFORE"] });
      await queryClient.cancelQueries({
        queryKey: ["reservationChange", reservationId],
      });
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
    onError: () => {
      alert("예약 변경은 한번만 가능합니다.");
      queryClient.invalidateQueries({
        queryKey: ["reservations", "BEFORE"],
      });
      queryClient.invalidateQueries({
        queryKey: ["reservationChange", String(reservationId)],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reservationChange", String(reservationId)],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["reservations", "BEFORE"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["timeSlot"],
        refetchType: "all",
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
  timeData?.forEach(({ startTime, isAvailable }) => {
    const formattedTime = formatTime(startTime);
    availabilityMap.set(formattedTime, isAvailable); // 시간별 예약 가능 여부 저장
  });

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
      {isLoading ? (
        <Loading text="로딩중.." />
      ) : (
        <div>
          <div className={style.buttonWrap}>
            {timeData?.map((data) => {
              const clock = data.startTime.slice(0, 5);
              const isAvailable = availabilityMap.get(clock) || false; // 예약 가능 여부
              const isSelected = selectClock === clock; // 선택 여부
              return (
                <div key={data.id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => handleOnClockBtn(clock)}
                    className={`${
                      isAvailable ? style.possibleBtn : style.impossibleBtn
                    } ${isSelected && style.selected}`}
                    disabled={!isAvailable} // 예약마감 버튼 비활성화
                  >
                    <p className={style.clockText}>{clock}</p>
                    <p
                      className={
                        isAvailable ? style.possible : style.impossible
                      }
                    >
                      {isAvailable ? "예약가능" : "예약마감"}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>

          <NextButton
            isEnabled={isNextButtonEnabled}
            onClick={handleOnNextBtn}
            label="변경 하기"
          />
        </div>
      )}
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

async function getTimeSlot(date: string): Promise<TimeType[]> {
  const res = await apiClient.get(`/api/timeslots?date=${date}`);
  return res.data;
}
