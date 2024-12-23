"use client";

// ReservationChangePage.tsx (서버 컴포넌트)
import ClientReservationChangePage from "./clientReservationChangePage";
import { useRecoilState } from "recoil";
import { reservationIdState } from "@/recoil/reservationIdAtom";

export default function Page() {
  const [reservationId] = useRecoilState(reservationIdState);
  if (!reservationId) return "잘못된 id 값입니다.";
  return <ClientReservationChangePage id={String(reservationId)} />;
}
