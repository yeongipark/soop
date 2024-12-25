"use client";

// ReservationChangePage.tsx (서버 컴포넌트)
import ClientReservationChangePage from "./clientReservationChangePage";
import { useRecoilState } from "recoil";
import { reservationIdState } from "@/recoil/reservationIdAtom";
import ProtectedPage from "@/components/protectedPage";

export default function Page({ params }: { params: { id: string } }) {
  const reservationId = params.id;
  if (!reservationId) return "잘못된 id 값입니다.";
  return (
    <ProtectedPage>
      <ClientReservationChangePage id={String(reservationId)} />
    </ProtectedPage>
  );
}
