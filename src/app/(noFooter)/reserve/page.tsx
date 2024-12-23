"use client";

import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";
import Calendar from "@/components/calendar/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const calendarProps = useCalendar();
  const [reserveData] = useRecoilState(reservationState);

  const { data, isLoading } = useQuery({
    queryKey: ["timeSlot", calendarProps.selectedDate.date],
    queryFn: () => getTimeSlot(calendarProps.selectedDate.date),
  });

  if (isLoading) return "로딩중...";

  if (reserveData.thumbnail === "") {
    return (
      <Alert
        title="올바르지 않은 접근입니다."
        setModalState={() => {
          router.replace("/");
        }}
      />
    );
  }

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
