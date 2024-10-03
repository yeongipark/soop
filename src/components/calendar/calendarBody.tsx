"use client";

import { useCalendar } from "@/hooks/useCalendar";
import style from "./calendarBody.module.css";

export default function CalendarBody() {
  const { daysInMonth, today } = useCalendar();
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className={style.container}>
      <div className={style.dayWrap}>
        {weeks.map((week, index) => (
          <Week
            key={index}
            text={week}
            isWeekend={index === 0 || index === 6}
          />
        ))}
      </div>
      <div className={style.dayWrap}>
        {daysInMonth.map((day, index) => (
          <Day
            key={index}
            day={day.day}
            isWeekend={day.dayIndexOfWeek === 0 || day.dayIndexOfWeek === 6}
            today={today(day.date)}
          />
        ))}
      </div>
    </div>
  );
}

// 요일(월, 화, 수 ... )을 나타내는 컴포넌트
function Week({ text, isWeekend }: { text: string; isWeekend: boolean }) {
  return (
    <div className={`${style.week} ${isWeekend && style.weekend}`}>{text}</div>
  );
}

// 날짜를 나타내는 컴포넌트 (1일, 2일 ...)
function Day({
  day,
  isWeekend,
  today,
}: {
  day: string;
  isWeekend: boolean;
  today: boolean;
}) {
  console.log(today);
  return (
    <div className={`${style.week} ${isWeekend && style.weekend}`}>
      {day}
      {today && "오늘"}
    </div>
  );
}
