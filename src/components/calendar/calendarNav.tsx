"use clinet";
import { useCalendar } from "@/hooks/useCalendar";
import style from "./calendarNav.module.css";

export default function CalendarNav() {
  const { currentDate, dispatch } = useCalendar();
  return (
    <div className={style.container}>
      <div className={style.button} onClick={dispatch.handlePrevMonth}>
        {"<"}
      </div>
      <div>
        {currentDate.year}년 {currentDate.month}월
      </div>
      <div className={style.button} onClick={dispatch.handleNextMonth}>
        {">"}
      </div>
    </div>
  );
}
