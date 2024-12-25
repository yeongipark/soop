"use client";

import { useEffect, useState } from "react";
import style from "./clockButtons.module.css";
import { useRouter } from "next/navigation";
import NextButton from "../nextButton";
import { TimeType } from "@/app/(noFooter)/reserve/page";
import { useSetRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/loading";

// 시간을 12시간제로 변환하는 함수
function formatTime(serverTime: string): string {
  const [hour, minute] = serverTime.split(":").map(Number);
  return `${hour}:${minute.toString().padStart(2, "0")}`;
}

function findTime(time: string, timeData: TimeType[]): number | null {
  const found = timeData.find((data) => formatTime(data.startTime) === time);
  return found ? found.id : null;
}

export default function ClockButtons({ date }: { date: string }) {
  const router = useRouter();
  const [selectClock, setSelectClock] = useState<string | null>(null);
  const [availabilityMap, setAvailabilityMap] = useState<Map<string, boolean>>(
    new Map()
  );

  useEffect(() => {
    setSelectClock(null);
  }, [date]);

  const { data: timeData, isLoading } = useQuery<TimeType[]>({
    queryKey: ["timeSlot", date],
    queryFn: () => getTimeSlot(date),
  });

  const setReservationState = useSetRecoilState(reservationState);

  // timeData가 변경될 때 availabilityMap 업데이트
  useEffect(() => {
    if (timeData) {
      const newAvailabilityMap = new Map<string, boolean>();
      timeData.forEach(({ startTime, isAvailable }) => {
        const formattedTime = formatTime(startTime);
        newAvailabilityMap.set(formattedTime, isAvailable);
      });
      setAvailabilityMap(newAvailabilityMap);
    }
  }, [timeData]);

  // 시간 클릭 핸들러 함수
  const handleOnClockBtn = (clock: string) => {
    const id = +findTime(clock, timeData);
    setReservationState((prev) => ({
      ...prev,
      timeSlotId: id,
      time: clock,
      date: date,
    }));
    setSelectClock(clock);
  };

  // 다음 단계 버튼 핸들러 함수
  const handleOnNextBtn = () => {
    router.push("/reserve/check");
  };

  return (
    <div className={style.container}>
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
            isEnabled={!!selectClock}
            onClick={handleOnNextBtn}
            label="다음 단계"
          />
        </div>
      )}
    </div>
  );
}

async function getTimeSlot(date: string): Promise<TimeType[]> {
  const res = await apiClient.get(`/api/timeslots?date=${date}`);
  return res.data;
}
