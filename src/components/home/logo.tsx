import { IoArrowDownCircleOutline } from "react-icons/io5";
import style from "./logo.module.css";

export default function Logo() {
  // 화살표 클릭 시 100vh 아래로 스크롤하는 함수
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight, // 현재 viewport 높이 (100vh 만큼 아래로 이동)
      behavior: "smooth", // 스크롤이 부드럽게 이동
    });
  };

  return (
    <div className={style.logo}>
      <div className={style.logoBackground}>
        <div>
          <ReserveButton />
        </div>
      </div>
      <div className={style.arrow} onClick={handleScroll}>
        <IoArrowDownCircleOutline size={40} />
      </div>
    </div>
  );
}

// 예약하기 버튼 ( 홈 화면에 사용되는 예약하기 버튼 )
export function ReserveButton() {
  return <button className={style.reserveButton}>예약하기 {">"}</button>;
}
