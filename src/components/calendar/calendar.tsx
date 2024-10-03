"use client";
import CalendarNav from "./calendarNav";
import style from "./calendar.module.css";
import CalendarBody from "./calendarBody";

export default function Calendar() {
  return (
    <div className={style.container}>
      <CalendarNav />
      <CalendarBody />
    </div>
  );
}
