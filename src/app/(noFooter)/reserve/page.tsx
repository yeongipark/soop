import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";
import Calendar from "@/components/calendar/calendar";

export default function Page() {
  return (
    <div>
      <ReserveTop />
      <div className={style.container}>
        <p>🗓️ 날짜와 시간을 선택해주세요</p>
        <Calendar />
        <ClockButtons />
      </div>
    </div>
  );
}
