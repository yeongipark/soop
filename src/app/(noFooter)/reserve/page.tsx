"use client";

import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";
import Calendar from "@/components/calendar/calendar";
import { useCalendar } from "@/hooks/useCalendar";
import { useRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";
import ProtectedPage from "@/components/protectedPage";

export interface TimeType {
  id: number;
  date: string;
  startTime: string;
  isAvailable: boolean;
}

export default function Page() {
  const router = useRouter();
  const calendarProps = useCalendar();
  const [reserveData] = useRecoilState(reservationState);

  if (reserveData.thumbnail === "") {
    return (
      <Alert
        title="올바르지 않은 접근입니다."
        setModalState={() => {
          router.back();
        }}
      />
    );
  }

  return (
    <ProtectedPage>
      <div>
        <ReserveTop />
        <div className={style.container}>
          <p>🗓️ 날짜와 시간을 선택해주세요</p>
          <Calendar {...calendarProps} />
          <ClockButtons date={calendarProps.selectedDate.date} />
        </div>
      </div>
    </ProtectedPage>
  );
}
