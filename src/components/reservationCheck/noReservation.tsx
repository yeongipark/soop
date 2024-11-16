import style from "./noReservation.module.css";

export default function NoReservation() {
  return (
    <div className={style.container}>
      <p className={style.title}>해당되는 예약 내역이 없습니다.</p>
      <p className={style.subTitle}>지금 새로운 촬영을 예약해보세요.</p>
      <a className={style.link} href="/product">
        예약하러 가기
      </a>
    </div>
  );
}
