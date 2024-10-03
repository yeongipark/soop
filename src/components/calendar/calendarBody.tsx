"use client";

import { useCalendar } from "@/hooks/useCalendar";
import style from "./calendarBody.module.css";
import { useEffect } from "react";

export default function CalendarBody() {
  const { daysInMonth, today, before, currentDate, dispatch, selectedDate } =
    useCalendar();
  useEffect(() => {
    console.log(daysInMonth);
  }, [daysInMonth]);
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div>
      <div className={style.navContainer}>
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
          {Array.isArray(daysInMonth) &&
            daysInMonth.map((day, index) => {
              return (
                <Day
                  key={index}
                  day={day.day}
                  isWeekend={
                    day.dayIndexOfWeek === 0 || day.dayIndexOfWeek === 6
                  }
                  today={today(day.date)}
                  before={before(day.date)}
                  displayNone={currentDate.month !== day.month}
                  onClick={() => selectedDate.selectDate(day.date)}
                  isSelected={selectedDate.date === day.date}
                />
              );
            })}
        </div>
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
  before,
  displayNone,
  onClick,
  isSelected,
}: {
  day: string;
  isWeekend: boolean;
  today: boolean;
  before: boolean;
  displayNone: boolean;
  onClick: () => void;
  isSelected: boolean;
}) {
  return (
    <div
      className={`${style.day} ${isWeekend && style.weekend} ${
        !today && before && style.disabled
      } ${displayNone && style.none} ${isSelected && style.selected}`}
      onClick={onClick}
    >
      {day}
      {today && (
        <div className={style.todayWrap}>
          <div className={style.today}></div>
        </div>
      )}
    </div>
  );
}
