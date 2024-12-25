"use client";

// ReservationChangePage.tsx (서버 컴포넌트)
import ClientReservationChangePage from "./clientReservationChangePage";
import ProtectedPage from "@/components/protectedPage";

export default function Page({ params }: { params: { id: string } }) {
  const reservationId = params.id;
  return (
    <ProtectedPage>
      <ClientReservationChangePage id={String(reservationId)} />
    </ProtectedPage>
  );
}
