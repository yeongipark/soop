import style from "./post.module.css";

export default function Post() {
  return (
    <div className={style.container}>
      <p className={style.title}>
        <a href={`/notice/detail`}>📢 예약 전 필독!</a>
      </p>
      <p className={style.date}>2024.10.25</p>
    </div>
  );
}
