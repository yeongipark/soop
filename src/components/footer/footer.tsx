import style from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={style.container}>
      <div>
        <p>re-bin</p>
        <p>
          <Link href={"/privacy"}>Privacy</Link>
        </p>
        <p>
          <a
            href="mailto:re.bin.subin@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            E-mail. re.bin.subin@gmail.com
          </a>
        </p>
        <p>Business License. 6031566033</p>
        <p>Address. (04563) 대구광역시 중구 달구벌대로447길 46, 3층</p>
        <p>Hosting by O & P</p>
      </div>
      <div className={style.sns}>
        <p>
          <p>Company. 리빈 스튜디오</p> <p>Ceo. 박수빈</p>
          <a
            href="https://www.instagram.com/re.bin___?igsh=cm85ZmR4ZmI2eGJt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instargram
          </a>{" "}
          |{" "}
          <a
            href="http://pf.kakao.com/_dClxdn"
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
