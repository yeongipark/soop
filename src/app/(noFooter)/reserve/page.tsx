"use client";

import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";
import Calendar from "@/components/calendar/calendar";
import { useCalendar } from "@/hooks/useCalendar";

export default function Page() {
  const calendarProps = useCalendar();
  return (
    <div>
      <ReserveTop />
      <div className={style.container}>
        <p>🗓️ 날짜와 시간을 선택해주세요</p>
        <Calendar {...calendarProps} />
        <ClockButtons selectDate={calendarProps.selectedDate.date} />
      </div>
    </div>
  );
}
