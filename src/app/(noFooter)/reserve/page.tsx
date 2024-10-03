import ReserveTop from "@/components/reserve/reserveTop";
import ClockButtons from "@/components/reserve/clockButtons";
import style from "./page.module.css";

export default function Page() {
  return (
    <div>
      <ReserveTop />
      <div className={style.container}>
        <ClockButtons />
      </div>
    </div>
  );
}
