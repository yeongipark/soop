import Link from "next/link";
import style from "./page.module.css";
import { BsCheck2Circle } from "react-icons/bs";
export default function Page() {
  return (
    <div className={style.container}>
      <BsCheck2Circle className={style.icon} />
      <p className={style.title}>예약이 완료되었습니다.</p>
      <Link href="/">홈으로</Link>
      <Link href="/reservation/check">예약 확인하기</Link>
    </div>
  );
}
