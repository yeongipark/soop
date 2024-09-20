"use client";
import { useState, useEffect } from "react";
import style from "./nav.module.css";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 50px 이상이면 true, 아니면 false
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
