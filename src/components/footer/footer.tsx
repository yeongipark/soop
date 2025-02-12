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
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        <p>Company. 리빈 스튜디오</p> <p>Ceo. 박수빈</p>
        <p>
          <a
            href="mailto:re.bin.subin@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            E-mail. re.bin.subin@gmail.com
          </a>
        </p>
      </div>
      {/* <div className={style.sns}>
        <p>
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
      </div> */}
    </footer>
  );
}
