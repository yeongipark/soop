"use client";

import style from "./calendar.module.css";
import CalendarBody from "./calendarBody";

export default function Calendar() {
  return (
    <div className={style.container}>
      <CalendarBody />
    </div>
  );
}
