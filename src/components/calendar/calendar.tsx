import style from "./calendar.module.css";
import CalendarBody from "./calendarBody";
import { CalendarBodyProps } from "@/types";

export default function Calendar({
  isOverMax,
  before,
  today,
  currentDate,
  daysInMonth,
  dispatch,
  selectedDate,
}: CalendarBodyProps) {
  return (
    <div className={style.container}>
      <CalendarBody
        isOverMax={isOverMax}
        before={before}
        today={today}
        currentDate={currentDate}
        daysInMonth={daysInMonth}
        dispatch={dispatch}
        selectedDate={selectedDate}
      />
    </div>
  );
}
