"use client";
import CalendarNav from "./calendarNav";
import style from "./calendar.module.css";

export default function Calendar() {
  return (
    <div className={style.container}>
      <CalendarNav />
    </div>
  );
}
