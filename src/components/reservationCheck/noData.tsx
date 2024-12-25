import Link from "next/link";
import style from "./noData.module.css";

export default function NoData() {
  return (
    <div className={style.container}>
      <p className={style.title}>해당되는 예약 내역이 없습니다. </p>
      <p className={style.subTitle}>지금 새로운 촬영을 예약해보세요.</p>
      <p className={style.link}>
        <Link href={"/product"}>예약하러 가기</Link>
      </p>
    </div>
  );
}
