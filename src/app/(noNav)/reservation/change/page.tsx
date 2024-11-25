"use client";

import style from "./page.module.css";
import ReserveTop from "@/components/reserve/reserveTop";
import Calendar from "@/components/calendar/calendar";
import ChangeClockButtons from "@/components/reservationChange/changeClockButtons";
import { useCalendar } from "@/hooks/useCalendar";

export default function Page() {
  const basicDate = "2024-11-30";
  //   const basicClock = "1:30";

  // useCalendar의 모든 반환값
  const calendarProps = useCalendar({ basicDate });

  return (
    <div>
      <p className={style.title}>예약 변경은 기간 내 한 번만 가능해요.</p>
      <ReserveTop />
      <div className={style.container}>
        <p>🗓️ 날짜와 시간을 선택해주세요</p>
        <Calendar {...calendarProps} />
        <ChangeClockButtons basicClock={"1:30"} />
      </div>
    </div>
  );
}
