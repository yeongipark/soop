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
import Loading from "@/components/loading/loading";

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
  totalPrice: number;
  canChange: boolean;
  productInfo: {
    id: number;
    name: string;
    thumbnail: string;
    summary: string;
    price: string;
    deposit: number;
  };
}

interface ClientReservationChangePageProps {
  id: string;
}

async function getReservationData(id: string): Promise<Reservation> {
  const response = await apiClient.get(`/api/reservations/${id}`);
  return response.data;
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

  useEffect(() => {
    if (data) {
      setState((prev) => ({
        ...prev,
        thumbnail: data.productInfo.thumbnail,
        price: data.productInfo.price,
        name: data.productInfo.name,
      }));
    }
  }, [data, setState]);

  if (data && data.canChange === false) {
    return (
      <Alert
        title="예약 변경은 한번만 가능합니다."
        type="cancel"
        setModalState={() => router.back()}
      />
    );
  }

  return (
    <div>
      {isLoading ? (
        <Loading text="로딩중.." />
      ) : (
        <div>
          <p className={style.title}>예약 변경은 기간 내 한 번만 가능해요.</p>
          <ReserveTop />
          <div className={style.container}>
            <p>🗓️ 날짜와 시간을 선택해주세요</p>
            <Calendar {...calendarProps} />
            <ChangeClockButtons
              reservationId={data!.id}
              basicDate={data!.shootDate}
              basicClock={data!.time.slice(0, 5)}
              selectDate={calendarProps.selectedDate.date}
            />
          </div>
        </div>
      )}
    </div>
  );
}
