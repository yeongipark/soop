"use client";

import style from "./page.module.css";
import ReserveTop from "@/components/reserve/reserveTop";
import Calendar from "@/components/calendar/calendar";
import ChangeClockButtons from "@/components/reservationChange/changeClockButtons";
import { useCalendar } from "@/hooks/useCalendar";
import apiClient from "@/util/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { reservationState } from "@/recoil/reservationAtom";
import Alert from "@/components/alert";
import { useRouter } from "next/navigation";
import { TimeType } from "@/app/(noFooter)/reserve/page";

interface Reservation {
  id: number;
  code: string;
  shootDate: string;
  time: string;
  name: string;
  phone: string;
  status: "PENDING_PAYMENT" | "PAID" | "CANCELLED" | "COMPLETED";
  peopleCnt: number;
  isAgreeUpload: boolean;
  notes: string;
  price: number;
  canChange: boolean;
  product: {
    id: number;
    name: string;
    thumbnail: string;
    summary: string;
    price: string;
  };
}

interface ClientReservationChangePageProps {
  id: string;
}

async function getReservationData(id: string): Promise<Reservation> {
  const response = await apiClient.get(`/api/reservations/${id}`);
  return response.data;
}

async function getTimeSlot(date: string): Promise<TimeType[]> {
  const res = await apiClient.get(`/api/timeslots?date=${date}`);
  return res.data;
}

export default function ClientReservationChangePage({
  id,
}: ClientReservationChangePageProps) {
  const router = useRouter();

  const setState = useSetRecoilState(reservationState);

  const { data, isLoading } = useQuery<Reservation>({
    queryKey: ["reservationChange", id],
    queryFn: () => getReservationData(id),
    refetchOnMount: false,
  });

  const calendarProps = useCalendar({
    basicDate: data?.shootDate,
  });

  const { data: timeSlots } = useQuery({
    queryKey: ["timeSlot", calendarProps.selectedDate.date],
    queryFn: () => getTimeSlot(calendarProps.selectedDate.date),
  });

  useEffect(() => {
    if (data) {
      setState((prev) => ({
        ...prev,
        thumbnail: data.product.thumbnail,
        price: data.product.price,
        name: data.product.name,
      }));
    }
  }, [data, setState]);

  if (isLoading) return <div>로딩중...</div>;

  if (data && data.canChange === false) {
    return (
      <Alert
        title="예약 변경 가능 기간이 아닙니다."
        type="cancel"
        setModalState={() => router.back()}
      />
    );
  }

  return (
    <div>
      <p className={style.title}>예약 변경은 기간 내 한 번만 가능해요.</p>
      <ReserveTop />
      <div className={style.container}>
        <p>🗓️ 날짜와 시간을 선택해주세요</p>
        <Calendar {...calendarProps} />
        <ChangeClockButtons
          basicDate={data!.shootDate}
          basicClock={data!.time.slice(0, 5)}
          selectDate={calendarProps.selectedDate.date}
          timeData={timeSlots!}
        />
      </div>
    </div>
  );
}
