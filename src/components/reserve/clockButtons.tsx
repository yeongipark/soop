"use client";

import { useState } from "react";
import style from "./clockButtons.module.css";
import { useRouter } from "next/navigation";
import NextButton from "../nextButton";
import { TimeType } from "@/app/(noFooter)/reserve/page";
import { useSetRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";

// 시간을 12시간제로 변환하는 함수
function formatTime(serverTime: string): string {
  const [hour, minute] = serverTime.split(":").map(Number);
  const formattedHour = hour % 12 || 12; // 0시는 12로 처리
  return `${formattedHour}:${minute.toString().padStart(2, "0")}`;
}

function findTime(time: string, timeData: TimeType[]) {
  return timeData.find((data) => {
    const curTime = formatTime(data.startTime);
    return curTime == time;
  })?.id;
}

export default function ClockButtons({ timeData }: { timeData: TimeType[] }) {
  const router = useRouter();
  const [selectClock, setSelectClock] = useState<string | null>(null);

  const setReservationState = useSetRecoilState(reservationState);

  // 시간 클릭 핸들러 함수
  const handleOnClockBtn = (clock: string) => {
    const id = +findTime(clock, timeData);
    setReservationState((prev) => ({
      ...prev,
      timeSlotId: id,
    }));
    setSelectClock(clock);
  };

  // 다음 단계 버튼 핸들러 함수
  const handleOnNextBtn = () => {
    router.push("/reserve/check");
  };

  // 예약 가능 여부를 계산
  const availabilityMap = new Map<string, boolean>();
  timeData.forEach(({ startTime, isAvailable }) => {
    const formattedTime = formatTime(startTime);
    availabilityMap.set(formattedTime, isAvailable); // 시간별 예약 가능 여부 저장
  });

  const am = ["10:00", "10:30", "11:00", "11:30"];
  const pm1 = ["1:00", "1:30", "2:00", "2:30"];
  const pm2 = ["3:00", "3:30", "4:00", "4:30"];

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
