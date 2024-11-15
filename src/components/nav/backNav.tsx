"use client";

import { useRouter } from "next/navigation";
import style from "./backNav.module.css";

import { IoArrowBackOutline } from "react-icons/io5";
export default function BackNav() {
  const router = useRouter();

  // 뒤로가기 버튼 클릭 핸들러
  const handleOnBackBtn = () => {
    router.back();
  };

  return (
    <div className={style.container}>
      <button className={style.backNav} onClick={handleOnBackBtn}>
        <IoArrowBackOutline />
      </button>
    </div>
  );
}
