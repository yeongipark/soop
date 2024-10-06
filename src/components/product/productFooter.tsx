"use client";

import { useState, MouseEvent as ReactMouseEvent } from "react";
import style from "./productFooter.module.css";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from "@/util/cookie";

export default function ProductFooter() {
  const router = useRouter();

  // 좋아요 눌렀는지 확인하는 state
  const [like, setLike] = useState(false);

  const handleLikeClick = () => {
    setLike(!like);
  };

  const handleButtonClick = (
    e: ReactMouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    let token = getToken();
    if (!token) {
      e.preventDefault();
      router.replace("/login");
    }
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
        <Link href={"/reserve"} onClick={handleButtonClick}>
          <button className={style.button}>예약하러 가기</button>
        </Link>
      </div>
    </div>
  );
}
