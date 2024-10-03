import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useEffect, useState } from "react";
import { DayInMonth } from "@/types";

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentYear, currentMonth, currentDay] = format(
    currentDate,
    "yyyy-MM-dd"
  ).split("-");
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [daysInMonth, setDaysInMonth] = useState<DayInMonth[]>([]);

  useEffect(() => {
    const startCurrentMonth = startOfMonth(currentDate);
    const endCurrentMonth = endOfMonth(currentDate);
    const startOfFirstWeek = startOfWeek(startCurrentMonth, {
      weekStartsOn: 0,
    });
    const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });
    const days = eachDayOfInterval({
      start: startOfFirstWeek,
      end: endOfLastWeek,
    });

    setDaysInMonth(
      days.map((day) => ({
        date: format(day, "yyyy-MM-dd"),
        year: format(day, "yyyy"),
        month: format(day, "MM"),
        day: format(day, "dd"),
        dayIndexOfWeek: getDay(day),
      }))
    );
  }, [currentDate]);

  const handlePrevMonth = () => {
    // 현재 달보다 이전으로 가지 못하게 설정
    if (currentDate.getMonth() === new Date().getMonth()) {
      return;
    }
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(format(new Date(date), "yyyy-MM-dd"));
  };

  const today = (date: string) => {
    return isToday(new Date(date));
  };

  const before = (date: string) => {
    return isBefore(new Date(date), new Date());
  };

  return {
    before,
    today,
    currentDate: {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    },
    daysInMonth,
    dispatch: {
      handlePrevMonth,
      handleNextMonth,
    },
    selectedDate: {
      date: selectedDate,
      selectDate: handleSelectDate,
    },
  };
};
