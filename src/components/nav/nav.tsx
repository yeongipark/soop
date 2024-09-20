"use client";
import { useNavScroll } from "@/hooks/useNavScroll";
import style from "./nav.module.css";

export default function Nav() {
  const { isScrolled } = useNavScroll();
  return (
    <div className={style.wrap}>
      <div className={`${style.container} ${isScrolled ? style.scrolled : ""}`}>
        <div className={style.buttons}>
          <p>예약하기</p>
          <p>소개</p>
          <p>로그인</p>
        </div>
      </div>
    </div>
  );
}
