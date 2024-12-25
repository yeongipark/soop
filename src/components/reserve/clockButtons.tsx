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

  if (isLoading) return "로딩중...";

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

  const am = ["10:00", "10:30", "11:00", "11:30"];
  const pm1 = ["13:00", "13:30", "14:00", "14:30"];
  const pm2 = ["15:00", "15:30", "16:00", "16:30"];

  return (
    <div className={style.container}>
      <p>오전</p>
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
                <p className={isAvailable ? style.possible : style.impossible}>
                  {isAvailable ? "예약가능" : "예약마감"}
                </p>
              </button>
            </div>
          );
        })}
      </div>
      <p>오후</p>
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
                <p className={isAvailable ? style.possible : style.impossible}>
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
                <p className={isAvailable ? style.possible : style.impossible}>
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
  );
}

async function getTimeSlot(date: string): Promise<TimeType[]> {
  const res = await apiClient.get(`/api/timeslots?date=${date}`);
  return res.data;
}
