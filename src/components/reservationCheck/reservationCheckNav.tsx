"use client";

import { useState } from "react";
import style from "./reservationCheckNav.module.css";

export default function ReservationCheckNav() {
  const [activeMenu, setActiveMenu] = useState("촬영전");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className={style.container}>
      <div
        className={`${style.menu} ${
          activeMenu === "촬영전" ? style.active : ""
        }`}
        onClick={() => handleMenuClick("촬영전")}
      >
        촬영전
      </div>
      <div
        className={`${style.menu} ${
          activeMenu === "촬영후" ? style.active : ""
        }`}
        onClick={() => handleMenuClick("촬영후")}
      >
        촬영후
      </div>
      <div
        className={`${style.menu} ${
          activeMenu === "취소됨" ? style.active : ""
        }`}
        onClick={() => handleMenuClick("취소됨")}
      >
        취소됨
      </div>
      <div
        className={style.indicator}
        style={{
          left: `${
            activeMenu === "촬영전"
              ? 0
              : activeMenu === "촬영후"
              ? 33.33
              : 66.66
          }%`,
        }}
      />
    </div>
  );
}
