"use client";

import { useState } from "react";
import style from "./productFooter.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

export default function ProductFooter() {
  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    setLike(!like);
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
        <button className={style.button}>예약하러 가기</button>
      </div>
    </div>
  );
}
