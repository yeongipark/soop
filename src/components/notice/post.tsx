import style from "./post.module.css";

export default function Post() {
  return (
    <div className={style.container}>
      <p className={style.title}>📢 예약 전 필독!</p>
      <p className={style.date}>2024.10.25</p>
    </div>
  );
}
