import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.container}>
      <div>
        <p>re-bin</p>
        <p>
          <a
            href="mailto:re.bin.subin@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            re.bin.subin@gmail.com
          </a>
        </p>
        <p>09:00 - 20:00 (Lunch Time 12:00 - 13:00)</p>
        <p>Hosting bt O & P</p>
      </div>
      <div className={style.sns}>
        <p>
          <a
            href="https://www.instagram.com/re.bin___?igsh=cm85ZmR4ZmI2eGJt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instargram
          </a>
          |
          <a
            href="https://open.kakao.com/o/sxFtI9Yg"
            target="_blank"
            rel="noopener noreferrer"
          >
            kakao
          </a>
        </p>
      </div>
    </footer>
  );
}
