import NoReservation from "@/components/reservationCheck/noReservation";
import Card from "@/components/reservationCheck/card";
import style from "./page.module.css";
import ReservationCheckNav from "@/components/reservationCheck/reservationCheckNav";

export default function Page() {
  return (
    <div>
      <p className={style.title}>촬영 예약내역</p>
      <div className={style.content_wrap}>
        <ReservationCheckNav />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
