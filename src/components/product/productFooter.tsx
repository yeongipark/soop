"use client";

import { useState } from "react";
import style from "./productFooter.module.css";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import Link from "next/link";

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
        <button className={style.button}>
          <Link href={"/reserve"}>예약하러 가기</Link>
        </button>
      </div>
    </div>
  );
}
