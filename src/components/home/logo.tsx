import { useEffect, useState } from "react";

import style from "./logo.module.css";
import Link from "next/link";

export default function Logo() {
  const [scale, setScale] = useState(1); // 초기 scale 값을 1로 설정
  // 스크롤 이벤트에 따라 scale과 opacity를 업데이트하는 함수
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // 현재 스크롤 위치
      const maxScroll = window.innerHeight; // 스크롤할 최대 높이 (100vh)
      const scaleValue = Math.min(1 + (scrollY / maxScroll) * 0.5, 1.5); // 최대 scale 1.5까지 증가
      setScale(scaleValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={style.logo}>
      <div className={style.stick}>
        <div
          className={style.logoBackground}
          style={{ transform: `scale(${scale})` }} // 스크롤에 따른 scale 적용
        ></div>
      </div>
      <div className={style.button}>
        <div className={style.buttonWrap}>
          <ReserveButton />
        </div>
      </div>
    </div>
  );
}

// 예약하기 버튼 ( 홈 화면에 사용되는 예약하기 버튼 )
export function ReserveButton() {
  return (
    <button className={style.reserveButton}>
      <Link href={"/product"}>예약하기 {">"}</Link>
    </button>
  );
}
