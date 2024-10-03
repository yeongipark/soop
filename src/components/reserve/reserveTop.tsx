import style from "./reserveTop.module.css";

export default function ReserveTop() {
  return (
    <div className={style.top}>
      <div className={style.imageWrap}></div>
      <div className={style.textWrap}>
        <p>개인 프로필</p>
        <p>80,000</p>
      </div>
    </div>
  );
}
