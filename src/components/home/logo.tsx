import { useEffect, useState } from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";

import style from "./logo.module.css";

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

  // 화살표 클릭 시 200vh 아래로 스크롤하는 함수
  const handleArrowClick = () => {
    window.scrollTo({
      top: window.innerHeight * 2, // 현재 viewport 높이 (100vh 만큼 아래로 이동)
      behavior: "smooth",
    });
  };

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
        <div className={style.arrow} onClick={handleArrowClick}>
          <IoArrowDownCircleOutline size={40} />
        </div>
      </div>
    </div>
  );
}

// 예약하기 버튼 ( 홈 화면에 사용되는 예약하기 버튼 )
export function ReserveButton() {
  return <button className={style.reserveButton}>예약하기 {">"}</button>;
}
