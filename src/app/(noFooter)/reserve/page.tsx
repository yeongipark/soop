import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";
import Calendar from "@/components/calendar/calendar";

export default function Page() {
  return (
    <div>
      <ReserveTop />
      <div className={style.container}>
        <Calendar />
        <ClockButtons />
      </div>
    </div>
  );
}
