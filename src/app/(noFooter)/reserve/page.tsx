"use client";

import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";
import Calendar from "@/components/calendar/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";

export interface TimeType {
  id: number;
  date: string;
  startTime: string;
  isAvailable: boolean;
}

async function getTimeSlot(date: string): Promise<TimeType[]> {
  const res = await apiClient.get(`/api/timeslots?date=${date}`);
  return res.data;
}

export default function Page() {
  const calendarProps = useCalendar();

  const { data, isLoading } = useQuery({
    queryKey: ["timeSlot", calendarProps.selectedDate.date],
    queryFn: () => getTimeSlot(calendarProps.selectedDate.date),
  });

  if (isLoading) return "로딩중...";

  return (
    <div>
      <ReserveTop />
      <div className={style.container}>
        <p>🗓️ 날짜와 시간을 선택해주세요</p>
        <Calendar {...calendarProps} />
        <ClockButtons timeData={data!} />
      </div>
    </div>
  );
}
