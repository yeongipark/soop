import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.container}>
      <div>
        <p>SOOP</p>
        <p>
          <a href="mailto:subin@naver.com">subin@naver.com</a> | 010.3381.2729
        </p>
        <p>09:00 - 20:00 (Lunch Time 12:00 - 13:00)</p>
        <p>Hosting bt O & P</p>
      </div>
      <div className={style.sns}>
        <p>
          <a>Instargram </a>| <a>kakao</a>
        </p>
      </div>
    </footer>
  );
}
