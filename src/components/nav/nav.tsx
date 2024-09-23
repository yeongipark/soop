"use client";
import { useNavScroll } from "@/hooks/useNavScroll";
import style from "./nav.module.css";
import Link from "next/link";

export default function Nav() {
  const { isScrolled } = useNavScroll();
  return (
    <div className={style.wrap}>
      <div className={`${style.container} ${isScrolled ? style.scrolled : ""}`}>
        <div className={style.buttons}>
          <p>예약하기</p>
          <p>소개</p>
          <p>
            <Link href={"/login"}>로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
