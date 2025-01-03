"use client";

import { useState } from "react";
import style from "./productFooter.module.css";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { useRouter } from "next/navigation";
import { getToken } from "@/util/cookie";

export default function ProductFooter({ liked }: { liked: boolean }) {
  const router = useRouter();

  // 좋아요 눌렀는지 확인하는 state
  const [like, setLike] = useState(liked);

  const handleLikeClick = () => {
    setLike(!like);
  };

  const handleButtonClick = () => {
    const token = getToken();
    if (token) router.replace("/reserve");
    if (!token) router.replace("/login");
  };

  return (
    <div className={style.container}>
      <div className={style.iconWrap} onClick={handleLikeClick}>
        {like ? (
          <IoMdHeart className={`${style.icon} ${style.animatedHeart}`} />
        ) : (
          <CiHeart className={style.icon} />
        )}
      </div>
      <div className={style.buttonWrap}>
        <button className={style.button} onClick={handleButtonClick}>
          예약하러 가기
        </button>
      </div>
    </div>
  );
}
